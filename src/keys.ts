import dotenv from 'dotenv';
dotenv.config();
const database = {
    host: process.env.DATABASE_URI,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
}
export {
    database
};