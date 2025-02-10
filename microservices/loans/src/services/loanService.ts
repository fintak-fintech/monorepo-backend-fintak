import { db } from '../config/db';

export const getLoans = async () => {
    const result = await db.query('SELECT * FROM loans');
    return result.rows;
};

export const createLoan = async (loanData: { amount: number; term: number }) => {
    const { amount, term } = loanData;
    const result = await db.query(
        'INSERT INTO loans (amount, term) VALUES ($1, $2) RETURNING *',
        [amount, term]
    );
    return result.rows[0];
};

export const updateLoan = async (id: string, loanData: { amount: number; term: number }) => {
    const { amount, term } = loanData;
    const result = await db.query(
        'UPDATE loans SET amount = $1, term = $2 WHERE id = $3 RETURNING *',
        [amount, term, id]
    );
    return result.rows[0];
};

export const deleteLoan = async (id: string) => {
    await db.query('DELETE FROM loans WHERE id = $1', [id]);
};
