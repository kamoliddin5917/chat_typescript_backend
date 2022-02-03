import CONFIG from "../config";
import { Pool } from "pg";

const pool = new Pool({ connectionString: CONFIG.DB_URL });

const pg = async (SQL: string, params: any) => {
  const client = await pool.connect();
  try {
    const {
      rows: [row],
    } = await client.query(SQL, params);
    return row;
  } finally {
    client.release();
  }
};

const pgAll = async (SQL: string, params: any) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(SQL, params);
    return rows;
  } finally {
    client.release();
  }
};

export default { pg, pgAll };
