import { config } from "dotenv";
import { join } from "path";

const envPath = join(process.cwd(), ".env");

config({
  path: envPath
});

export const { 
  PORT, PGDATABASE, PGHOST, PGUSER, PGPASSWORD, 
  SMTP_EMAIL, SMTP_PASSWORD, ACCESS_TOKEN_SECRET, EMAIL_FROM,
  IS_SSL_REQUIRED
} = process.env as Record<string, string>;

export const { NODE_ENV } = process.env as { NODE_ENV: "production" | "development" };

const envs = { 
  NODE_ENV, PORT, PGDATABASE, PGHOST, PGUSER, PGPASSWORD,
  SMTP_EMAIL, SMTP_PASSWORD, ACCESS_TOKEN_SECRET, EMAIL_FROM,
  IS_SSL_REQUIRED
};

Object.keys(envs).forEach(envName => {
  const env = process.env[envName];
  if(!env) throw new Error(`Env (${envName}) is missing`);
});