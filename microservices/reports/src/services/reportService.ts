import { db } from '../config/db';

export const getReports = async () => {
    const result = await db.query('SELECT * FROM reports');
    return result.rows;
};

export const createReport = async (reportData: { title: string; content: string }) => {
    const { title, content } = reportData;
    const result = await db.query(
        'INSERT INTO reports (title, content) VALUES ($1, $2) RETURNING *',
        [title, content]
    );
    return result.rows[0];
};

export const updateReport = async (id: string, reportData: { title: string; content: string }) => {
    const { title, content } = reportData;
    const result = await db.query(
        'UPDATE reports SET title = $1, content = $2 WHERE id = $3 RETURNING *',
        [title, content, id]
    );
    return result.rows[0];
};

export const deleteReport = async (id: string) => {
    await db.query('DELETE FROM reports WHERE id = $1', [id]);
};
