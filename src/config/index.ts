import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  DB_URL: process.env.DB_URL,
};
