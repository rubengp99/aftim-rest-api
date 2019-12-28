import dotenv from 'dotenv';
dotenv.config();
export const database = {
    host: process.env.DATABASE_URI,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
}
export const tokenKey = process.env.TOKEN_KEY;