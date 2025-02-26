import { queryDatabase } from '../config/db';

export const getBenefits = async (category: string, orderBy: string) => {
  let query = `SELECT * FROM Benefits WHERE status = 'active'`;

  if (category) {
    query += ` AND category = $1`;
  }
  
  if (orderBy === "date") {
    query += ` ORDER BY validity_start ASC`;
  } else if (orderBy === "popularity") {
    query += ` ORDER BY created_at DESC`;
  }

  const result = await queryDatabase({
    query,
    params: []
  });
  return result.rows;
};

export const createBenefit = async (benefitData: { title: string; description: string }) => {
  const { title, description } = benefitData;
  const result = await queryDatabase(
    {
      query: 'INSERT INTO benefits (title, description) VALUES ($1, $2) RETURNING *',
      params: [title, description]
    }
  );
  return result.rows[0];
};

export const updateBenefit = async (id: string, benefitData: { title: string; description: string }) => {
  const { title, description } = benefitData;
  const result = await queryDatabase(
    {
      query: 'UPDATE benefits SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      params: [title, description, id]
    }
  );
  return result.rows[0];
};

export const deleteBenefit = async (id: string) => {
  await queryDatabase({
    query: 'DELETE FROM benefits WHERE id = $1',
    params: [id]
  });
};

export const toggleBenefitStatus = async (id: string) => {
  const result = await queryDatabase(
    {
      query: 'UPDATE benefits SET enabled = NOT enabled WHERE id = $1 RETURNING *',
      params: [id]
    }
  );
  return result.rows[0];
};

export const getBenefitById = async (id: string) => {
  const result = await queryDatabase({
    query: `SELECT * FROM Benefits WHERE id = $1 AND status = 'active'`,
    params: [id]
  });
  return result.rows[0];
};
