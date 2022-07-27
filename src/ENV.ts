
import { config } from "dotenv";
import * as path from "path";

export const ENV_DEVELOPMENT = "development";
export const ENV_STAGING = "staging";
export const ENV_PRODUCTION = "production";
config({
  path: path.join(
    process.cwd(),
    "environments",
    `${process.env.NODE_ENV ? process.env.NODE_ENV : "development"}.env`
  ),
});

export const ENV = {
  PORT: 1300,
  API_PREFIX: "api/v1",
  API_TITLE: "Biller",
  API_DESC: `Biller is a simple REST API service to register clients & services provide by the user to automatically send the clients subscription invoices through Email / Mobile in every subscription period.`,
  API_VERSION: "1.0",

  TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION,
  TYPEORM_HOST: process.env.TYPEORM_HOST,
  TYPEORM_PORT: process.env.TYPEORM_PORT,
  TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
  TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
  TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
  TYPEORM_SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE,
  TYPEORM_LOGGING: process.env.TYPEORM_LOGGING,

  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_SECURE: process.env.MAIL_SECURE,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_FROM: process.env.MAIL_FROM,
};