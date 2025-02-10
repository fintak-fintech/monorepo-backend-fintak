import { db } from '../config/db';

export const getSupports = async () => {
    const result = await db.query('SELECT * FROM supports');
    return result.rows;
};

export const createSupport = async (supportData: { issue: string; status: string }) => {
    const { issue, status } = supportData;
    const result = await db.query(
        'INSERT INTO supports (issue, status) VALUES ($1, $2) RETURNING *',
        [issue, status]
    );
    return result.rows[0];
};

export const updateSupport = async (id: string, supportData: { issue: string; status: string }) => {
    const { issue, status } = supportData;
    const result = await db.query(
        'UPDATE supports SET issue = $1, status = $2 WHERE id = $3 RETURNING *',
        [issue, status, id]
    );
    return result.rows[0];
};

export const deleteSupport = async (id: string) => {
    await db.query('DELETE FROM supports WHERE id = $1', [id]);
};
