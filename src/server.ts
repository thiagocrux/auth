import mongoose from 'mongoose';
import config from './config/config';
import app from './app';

/* Database server */

mongoose.connect(
  config.database.connectionString,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log(`[DATABASE] Running on: ${config.database.connectionString}\n`)
);

/* App server */

app.listen(config.server, () =>
  console.log(`[SERVER] Running on: ${config.server.hostname}:${config.server.port}`)
);
