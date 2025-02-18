import { db } from "../config/db";

export const getRequests = async () => {
  const result = await db.query("SELECT * FROM requests ORDER BY created_at DESC");
  return result.rows;
};

export const getRequestById = async (id: string) => {
  const result = await db.query("SELECT * FROM requests WHERE id = $1", [id]);
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
  const result = await db.query(
    "INSERT INTO requests (company_id, user_id, request_type, request_description, status, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
    [company_id, user_id, request_type, request_description, status]
  );
  return result.rows[0];
};

export const updateRequestStatus = async (id: string, status: string) => {
  const result = await db.query(
    "UPDATE requests SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};
