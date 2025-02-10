import { Pool } from 'pg';

export const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

db.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

db.on('error', (err) => {
    console.error('Error connecting to the PostgreSQL database', err);
});
