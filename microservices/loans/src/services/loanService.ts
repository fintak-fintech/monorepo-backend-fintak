import { queryDatabase } from "../config/db";

export const getLoans = async () => {
  const result = await queryDatabase({
    query: "SELECT * FROM loans ORDER BY request_date DESC",
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

export const getLoanById = async (loan_id: string, user_id: string) => {
  const query = `
      SELECT id, amount, term, interest_rate, status, request_date, 
             approval_date, payment_date, disbursement_status, disbursement_date 
      FROM Loans 
      WHERE id = $1 AND employee_id = $2`;
  const result = await queryDatabase({
    query: query,
    params: [loan_id, user_id],
  });
  return result.rows[0];
};

export const getLoansByUserId = async (userId: string) => {
  const result = await queryDatabase({
    query: "SELECT * FROM loans WHERE employee_id = $1 ORDER BY request_date DESC",
    params: [userId],
  });
  return result.rows;
};

export const getLoansByCompany = async (company_id: string) => {
  const query = `
    SELECT l.*, e.first_name, e.last_name, e.company_id
    FROM Loans l
    JOIN Employees e ON l.employee_id = e.cognito_sub
    WHERE e.company_id = $1
    ORDER BY l.request_date DESC
  `;
  const result = await queryDatabase({
    query,
    params: [company_id]
  });
  return result.rows;
}