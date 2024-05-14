import dotenv from "dotenv";
dotenv.config();
const { DBHOST, PORT } = process.env;

interface EnvsConfig {
  port?: string;
  dbHost?: string;
}

const envsConfig: EnvsConfig = {
  port: PORT,
  dbHost: DBHOST
};

export default envsConfig;
