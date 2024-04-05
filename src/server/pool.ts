import { createPool } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
}).promise();

export default pool;
