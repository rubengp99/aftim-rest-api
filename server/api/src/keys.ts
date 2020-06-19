import dotenv from 'dotenv';
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI
export const MONGO_DB = process.env.MONGO_DB
export const tokenKey = process.env.TOKEN_KEY;
export const dataURL = process.env.DATA_URL;
export const authURL = process.env.AUTH_URL;