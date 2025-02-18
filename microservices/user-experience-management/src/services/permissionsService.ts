import { db } from "../config/db";

export const getUserPermissions = async (userId: string) => {
  const query = `
      SELECT p.name
      FROM users_permissions up
      JOIN permissions p ON up.permission_id = p.id
      WHERE up.user_id = $1
    `;
  const { rows } = await db.query(query, [userId]);
  return rows.map((row: { name: string }) => row.name);
};
