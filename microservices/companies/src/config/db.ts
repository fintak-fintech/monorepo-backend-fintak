import dotenv from "dotenv";
import { Pool, PoolClient } from "pg";
import { ServerError } from "./errors/Errors";
import { QueryDatabaseType } from "./db.types";

dotenv.config();

let pool: Pool;

const createConnection = async () => {
  if (pool) return pool;

  const newPool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "", 10) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: String(process.env.DB_PASSWORD ?? ""),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  pool = newPool;
  return newPool;
};

export const queryDatabase = async ({ query, params }: QueryDatabaseType) => {
  let client: PoolClient | null = null;
  try {
    const pool = await createConnection();
    client = await pool.connect();

    const result = await client.query(query, params);
    return result;
  } catch (error: any) {
    console.log("error inside connection database", error);
    throw new ServerError("Error database connection");
  } finally {
    if (client) client.release();
  }
};
