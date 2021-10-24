import * as dotenv from 'dotenv';

dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';
// application
const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || '#87e8de';
const DOMAIN: string = process.env.DOMAIN || 'localhost';
const PORT: number = +process.env.PORT || 3000;
const END_POINT: string = process.env.END_POINT || 'graphql';
const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 3;

// typeorm
const enviroment = {
  development: {
    SQL_HOST: process.env.SQL_HOST,
    SQL_USERNAME: process.env.SQL_USERNAME,
    SQL_PASSWORD: process.env.SQL_PASSWORD,
    SQL_DATABASE: process.env.SQL_DATABASE,
    SQL_PORT: +process.env.SQL_PORT,
  },
  testing: {
    SQL_HOST: process.env.SQL_HOST,
    SQL_USERNAME: process.env.SQL_USERNAME,
    SQL_PASSWORD: process.env.SQL_PASSWORD,
    SQL_DATABASE: process.env.SQL_DATABASE,
    SQL_PORT: +process.env.SQL_PORT,
  },
  staging: {
    SQL_HOST: process.env.SQL_HOST,
    SQL_USERNAME: process.env.SQL_USERNAME,
    SQL_PASSWORD: process.env.SQL_PASSWORD,
    SQL_DATABASE: process.env.SQL_DATABASE,
    SQL_PORT: +process.env.SQL_PORT,
  },
  production: {
    SQL_HOST: process.env.SQL_HOST,
    SQL_USERNAME: process.env.SQL_USERNAME,
    SQL_PASSWORD: process.env.SQL_PASSWORD,
    SQL_DATABASE: process.env.SQL_DATABASE,
    SQL_PORT: +process.env.SQL_PORT,
  },
};
const TYPEORM = enviroment[NODE_ENV];

// jwt
const TOKEN_SECRET: string = process.env.PROJECT_ENV || 'secretKeyTest';

// password
const BCRYPT_SALT: string = process.env.BCRYPT_SALT || 'bcryptSaltTest';

export {
  NODE_ENV,
  PRIMARY_COLOR,
  DOMAIN,
  PORT,
  END_POINT,
  GRAPHQL_DEPTH_LIMIT,
  TYPEORM,
  TOKEN_SECRET,
  BCRYPT_SALT,
};
