import { queryDatabase } from "../config/db";

type LoansFilterType = {
  status?: string;
  page: number;
  limit: number;
  offset: number;
};

export const getLoans = async ({
  status,
  page,
  limit,
  offset,
}: LoansFilterType) => {
  let query = `
      SELECT id, amount, term, interest_rate, status, request_date, 
             approval_date, payment_date, disbursement_status 
      FROM Loans
    `;
  const queryParams = [];

  if (status) {
    query += ` AND status = $2`;
    queryParams.push(status);
  }

  query += ` ORDER BY request_date DESC LIMIT $3 OFFSET $4`;
  queryParams.push(String(limit), String(offset));
  const result = await queryDatabase({
    query,
    params: [],
  });
  return result.rows;
};

export const createLoan = async (loanData: {
  employee_id: string;
  amount: number;
  term: number;
  interest_rate: number;
  status: string;
  approval_date?: string;
  payment_date?: string;
  disbursement_status: string;
  disbursement_date?: string;
}) => {
  const {
    employee_id,
    amount,
    term,
    interest_rate,
    status,
    approval_date,
    payment_date,
    disbursement_status,
    disbursement_date,
  } = loanData;

  const result = await queryDatabase({
    query: `INSERT INTO loans (employee_id, amount, term, interest_rate, status, approval_date, payment_date, disbursement_status, disbursement_date) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    params: [
      employee_id,
      amount,
      term,
      interest_rate,
      status,
      approval_date,
      payment_date,
      disbursement_status,
      disbursement_date,
    ],
  });
  return result.rows[0];
};

export const updateLoan = async (
  id: string,
  loanData: { amount: number; term: number }
) => {
  const { amount, term } = loanData;
  const result = await queryDatabase({
    query: "UPDATE loans SET amount = $1, term = $2 WHERE id = $3 RETURNING *",
    params: [amount, term, id],
  });
  return result.rows[0];
};

export const getLoanById = async ({
  loan_id,
  user_id,
}: {
  loan_id: string;
  user_id: string;
}) => {
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

export const getLoansByUserId = async ({
  user_id,
  filter,
}: {
  user_id: string;
  filter: LoansFilterType;
}) => {
  let query = `
      SELECT id, amount, term, interest_rate, status, request_date, 
             approval_date, payment_date, disbursement_status 
      FROM Loans 
      WHERE employee_id = $1
    `;

  const queryParams = [user_id];

  if (filter.status) {
    query += ` AND status = $2`;
    queryParams.push(filter.status);
  }

  query += ` ORDER BY request_date DESC LIMIT $3 OFFSET $4`;
  queryParams.push(String(filter.limit), String(filter.offset));

  const result = await queryDatabase({
    query,
    params: queryParams,
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
    params: [company_id],
  });
  return result.rows;
};

export const updateApprovalDate = async (id: string, approval_date: string) => {
  const result = await queryDatabase({
    query:
      "UPDATE loans SET approval_date = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    params: [approval_date, id],
  });

  return result.rows[0];
};

export const updatePaymentDate = async (id: string, payment_date: string) => {
  const result = await queryDatabase({
    query:
      "UPDATE loans SET payment_date = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
    params: [payment_date, id],
  });
  return result.rows[0];
};
