import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { registerValidation, loginValidation } from './authValidation';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  /* Validating the fields */

  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  /* Checking if the inserted e-mail already exists */

  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) {
    return res.status(400).json({
      error: 'The inserted e-mail already exists. Please choose another valid e-mail.',
    });
  }

  /* Encrypting the password */

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  /* Registering the user */

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const registeredUser = await user.save();

    res.status(200).json({
      registeredUser: registeredUser._id,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});

router.post('/login', async (req, res) => {
  /* Validating the fields */

  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  /* Checking if the user of the inserted e-mail already exists */

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({
      error: 'The inserted e-mail was not found in our database. Please enter a valid e-mail.',
    });
  }

  /* Checking if the password is correct */

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).json({
      error: 'The inserted inserted password is invalid.',
    });
  }

  /* Creating an assign token */

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!);
  res.header('auth-token', token).json({ token });
});

export default router;
