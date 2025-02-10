import { db } from '../config/db';

export const getFunders = async () => {
    const result = await db.query('SELECT * FROM funders');
    return result.rows;
};

export const createFunder = async (funderData: { name: string; amount: number }) => {
    const { name, amount } = funderData;
    const result = await db.query(
        'INSERT INTO funders (name, amount) VALUES ($1, $2) RETURNING *',
        [name, amount]
    );
    return result.rows[0];
};

export const updateFunder = async (id: string, funderData: { name: string; amount: number }) => {
    const { name, amount } = funderData;
    const result = await db.query(
        'UPDATE funders SET name = $1, amount = $2 WHERE id = $3 RETURNING *',
        [name, amount, id]
    );
    return result.rows[0];
};

export const deleteFunder = async (id: string) => {
    await db.query('DELETE FROM funders WHERE id = $1', [id]);
};
