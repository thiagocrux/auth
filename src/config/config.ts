import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/variables.env` });

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const DATABASE = {
  connectionString: DB_CONNECTION_STRING,
};

const config = {
  server: SERVER,
  database: DATABASE,
};

export default config;
