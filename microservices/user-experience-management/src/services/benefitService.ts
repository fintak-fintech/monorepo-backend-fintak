import { db } from '../config/db';

export const getBenefits = async () => {
  const result = await db.query('SELECT * FROM benefits');
  return result.rows;
};

export const createBenefit = async (benefitData: { title: string; description: string }) => {
  const { title, description } = benefitData;
  const result = await db.query(
    'INSERT INTO benefits (title, description) VALUES ($1, $2) RETURNING *',
    [title, description]
  );
  return result.rows[0];
};

export const updateBenefit = async (id: string, benefitData: { title: string; description: string }) => {
  const { title, description } = benefitData;
  const result = await db.query(
    'UPDATE benefits SET title = $1, description = $2 WHERE id = $3 RETURNING *',
    [title, description, id]
  );
  return result.rows[0];
};

export const deleteBenefit = async (id: string) => {
  await db.query('DELETE FROM benefits WHERE id = $1', [id]);
};

export const toggleBenefitStatus = async (id: string) => {
  const result = await db.query(
    'UPDATE benefits SET enabled = NOT enabled WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
