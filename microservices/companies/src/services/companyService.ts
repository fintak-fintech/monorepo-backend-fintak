import { db } from '../config/db';

export const getCompanies = async () => {
    const result = await db.query('SELECT * FROM companies');
    return result.rows;
};

export const createCompany = async (companyData: { name: string; address: string }) => {
    const { name, address } = companyData;
    const result = await db.query(
        'INSERT INTO companies (name, address) VALUES ($1, $2) RETURNING *',
        [name, address]
    );
    return result.rows[0];
};

export const updateCompany = async (id: string, companyData: { name: string; address: string }) => {
    const { name, address } = companyData;
    const result = await db.query(
        'UPDATE companies SET name = $1, address = $2 WHERE id = $3 RETURNING *',
        [name, address, id]
    );
    return result.rows[0];
};

export const deleteCompany = async (id: string) => {
    await db.query('DELETE FROM companies WHERE id = $1', [id]);
};