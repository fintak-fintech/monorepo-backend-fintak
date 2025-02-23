import { queryDatabase } from "../config/db";

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
  const { rows } = await queryDatabase({
    query,
    params: values
  });
  return rows[0];
};

export const getSimulationsByUser = async (userId: string) => {
  const result = await queryDatabase({
    query: "SELECT * FROM simulations WHERE user_id = $1",
    params: [userId],
  });
  return result.rows;
};

export const getLastSimulationByUser = async (userId: string) => {
  const result = await queryDatabase({
    query: "SELECT * FROM simulations WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1",
    params: [userId],
  });
  return result.rows[0];
};