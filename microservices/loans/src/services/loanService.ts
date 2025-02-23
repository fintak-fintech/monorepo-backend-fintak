import { queryDatabase } from "../config/db";

export const getLoans = async () => {
  const result = await queryDatabase({
    query: "SELECT * FROM loans",
    params: [],
  });
  return result.rows;
};

export const createLoan = async (loanData: {
  amount: number;
  term: number;
}) => {
  const { amount, term } = loanData;
  const result = await queryDatabase(
    {
      query: "INSERT INTO loans (amount, term) VALUES ($1, $2) RETURNING *",
      params: [amount, term]
    }
  );
  return result.rows[0];
};

export const updateLoan = async (
  id: string,
  loanData: { amount: number; term: number }
) => {
  const { amount, term } = loanData;
  const result = await queryDatabase(
    {
      query: "UPDATE loans SET amount = $1, term = $2 WHERE id = $3 RETURNING *",
      params: [amount, term, id]
    }
  );
  return result.rows[0];
};

export const getLoanById = async (id: string) => {
  const result = await queryDatabase({
    query: "SELECT * FROM loans WHERE id = $1",
    params: [id],
  });
  return result.rows[0];
};

export const getLoansByUserId = async (userId: string) => {
  const result = await queryDatabase({
    query: "SELECT * FROM loans WHERE user_id = $1",
    params: [userId],
  });
  return result.rows;
};