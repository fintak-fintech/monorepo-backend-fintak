import { queryDatabase } from '../config/db';

export const getTips = async () => {
  const result = await queryDatabase({
    query: 'SELECT * FROM tips',
    params: []
  });
  return result.rows;
};

export const createTip = async (tipData: { title: string; content: string }) => {
  const { title, content } = tipData;
  const result = await queryDatabase(
    {
      query:'INSERT INTO tips (title, content) VALUES ($1, $2) RETURNING *',
      params: [title, content]
    }
  );
  return result.rows[0];
};

export const updateTip = async (id: string, tipData: { title: string; content: string }) => {
  const { title, content } = tipData;
  const result = await queryDatabase(
    {
      query: 'UPDATE tips SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      params: [title, content, id]
    }
  );
  return result.rows[0];
};

export const deleteTip = async (id: string) => {
  await queryDatabase({
    query: 'DELETE FROM tips WHERE id = $1',
    params: [id]
  });
};

export const toggleTipStatus = async (id: string) => {
  const result = await queryDatabase(
    {
      query: 'UPDATE tips SET enabled = NOT enabled WHERE id = $1 RETURNING *',
      params: [id]
    }
  );
  return result.rows[0];
};


export const getTipById = async (id: string) => {
  const result = await queryDatabase({
    query: 'SELECT * FROM tips WHERE id = $1',
    params: [id]
  });
  return result.rows[0];
};