import { db } from '../config/db';

export const getCompanies = async () => {
    const result = await db.query('SELECT * FROM companies');
    return result.rows;
};

export const createCompany = async (companyData: { 
    name: string; 
    nit: string;
    address: string; 
    phone: string; 
    contact_email: string; 
    status: string; 
    logo_url?: string; 
    company_type: string; 
}) => {
    const { name, nit, address, phone, contact_email, status, logo_url, company_type } = companyData;
    const isDuplicate = await checkDuplicateCompany(nit);
    if (isDuplicate) {
        throw new Error('Company with this nit already exists');
    }

    const result = await db.query(
        `INSERT INTO companies (
            name, nit, address, phone, contact_email, status, logo_url, company_type
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [name, nit, address, phone, contact_email, status, logo_url, company_type]
    );
    return result.rows[0];
};

export const checkDuplicateCompany = async (nit: string) => {
    const result = await db.query(
        `SELECT * FROM companies WHERE nit = $1`,
        [nit]
    );
    return result.rows.length > 0;
};

export const updateCompany = async (id: string, companyData: { 
    name: string; 
    address: string; 
    phone: string; 
    contact_email: string; 
    status: string; 
    logo_url?: string; 
    company_type: string; 
}) => {
    const { name, address, phone, contact_email, status, logo_url, company_type } = companyData;
    const result = await db.query(
        `UPDATE companies SET 
            name = $1, address = $2, phone = $3, contact_email = $4, status = $5, logo_url = $6, company_type = $7, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $8 RETURNING *`,
        [name, address, phone, contact_email, status, logo_url, company_type, id]
    );
    return result.rows[0];
};

export const deleteCompany = async (id: string) => {
    const result = await db.query(
        `UPDATE companies SET status = '0', updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};