import { queryDatabase } from "../config/db";

export const getRequests = async () => {
  const result = await queryDatabase({
    query: "SELECT * FROM requests ORDER BY created_at DESC",
    params: []
  });
  return result.rows;
};

export const getRequestById = async (id: string) => {
  const result = await queryDatabase({
    query: "SELECT * FROM requests WHERE id = $1",
    params: [id]
  });
  return result.rows[0];
};

export const createRequest = async (requestData: {
  company_id: string;
  user_id: string;
  request_type: string;
  request_description: string;
  status: string;
}) => {
  const { company_id, user_id, request_type, request_description, status } =
    requestData;
  const result = await queryDatabase(
    {
      query: "INSERT INTO requests (company_id, user_id, request_type, request_description, status, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
      params: [company_id, user_id, request_type, request_description, status]
    }
  );
  return result.rows[0];
};

export const updateRequestStatus = async (id: string, status: string) => {
  const result = await queryDatabase(
    {
      query: 'UPDATE Support_Requests SET status=$1, updated_at=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *',
      params: [status, id],
    }
  );
  if (result.rows.length === 0) return false;
  return true;
};
