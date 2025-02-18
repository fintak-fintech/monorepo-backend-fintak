import { db } from '../config/db';

export const getTips = async () => {
  const result = await db.query('SELECT * FROM tips');
  return result.rows;
};

export const createTip = async (tipData: { title: string; content: string }) => {
  const { title, content } = tipData;
  const result = await db.query(
    'INSERT INTO tips (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return result.rows[0];
};

export const updateTip = async (id: string, tipData: { title: string; content: string }) => {
  const { title, content } = tipData;
  const result = await db.query(
    'UPDATE tips SET title = $1, content = $2 WHERE id = $3 RETURNING *',
    [title, content, id]
  );
  return result.rows[0];
};

export const deleteTip = async (id: string) => {
  await db.query('DELETE FROM tips WHERE id = $1', [id]);
};

export const toggleTipStatus = async (id: string) => {
  const result = await db.query(
    'UPDATE tips SET enabled = NOT enabled WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
