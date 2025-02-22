import { queryDatabase } from "../config/db";

export const getUserPermissions = async (userId: string) => {
  const result = queryDatabase({
    query: `
      SELECT p.name
      FROM users_permissions up
      JOIN permissions p ON up.permission_id = p.id
      WHERE up.user_id = $1
    `,
    params: [userId],
  });
  const rows = (await result).rows;
  return rows.map((row: { name: string }) => row.name);
};
