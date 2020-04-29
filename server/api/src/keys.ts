import dotenv from 'dotenv';
dotenv.config();
export const tokenKey = process.env.TOKEN_KEY;
export const dataURL = process.env.DATA_URL;
export const authURL = process.env.AUTH_URL;