import { db } from "../config/db";

export const saveSimulation = async (
  user_id: number,
  amount: number,
  term: number,
  annual_interest: number,
  simulation_result: string
) => {
  const query = `
      INSERT INTO simulations (user_id, simulation_type, amount, term, interest_rate, simulation_result, created_at, updated_at) 
      VALUES ($1, 'loan', $2, $3, $4, $5, NOW(), NOW()) RETURNING *
    `;
  const values = [user_id, amount, term, annual_interest, simulation_result];
  const { rows } = await db.query(query, values);
  return rows[0];
};
