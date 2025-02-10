import { db } from '../config/db';

export const getPromotions = async () => {
    const result = await db.query('SELECT * FROM promotions');
    return result.rows;
};

export const createPromotion = async (promotionData: { title: string; discount: number }) => {
    const { title, discount } = promotionData;
    const result = await db.query(
        'INSERT INTO promotions (title, discount) VALUES ($1, $2) RETURNING *',
        [title, discount]
    );
    return result.rows[0];
};

export const updatePromotion = async (id: string, promotionData: { title: string; discount: number }) => {
    const { title, discount } = promotionData;
    const result = await db.query(
        'UPDATE promotions SET title = $1, discount = $2 WHERE id = $3 RETURNING *',
        [title, discount, id]
    );
    return result.rows[0];
};

export const deletePromotion = async (id: string) => {
    await db.query('DELETE FROM promotions WHERE id = $1', [id]);
};
