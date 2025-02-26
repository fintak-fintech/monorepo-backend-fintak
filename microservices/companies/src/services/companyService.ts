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

export const updateCompany = async (nit: string, companyData: { 
    name: string; 
    address: string; 
    phone: string; 
    contact_email: string; 
    logo_url?: string; 
    company_type: string; 
}) => {
    const { name, address, phone, contact_email, logo_url, company_type } = companyData;
    const company = await findByCompanyByNit(nit);
    if (!company) {
        throw new Error('Company not found');
    }

    if (name != "") {
        company.name = name;
    }
    if (address != "") {
        company.address = address;
    }
    if (phone != "") {
        company.phone = phone;
    }
    if (contact_email != "") {
        company.contact_email = contact_email;
    }
    if (logo_url != "") {
        company.logo_url = logo_url;
    }
    if (company_type != "") {
        company.company_type = company_type;
    }

    const result = await db.query(
        `UPDATE companies SET 
            name = $1, address = $2, phone = $3, contact_email = $4, logo_url = $5, company_type = $6, updated_at = CURRENT_TIMESTAMP 
        WHERE nit = $7 RETURNING *`,
        [name, address, phone, contact_email, logo_url, company_type, nit]
    );
    return result.rows[0];
};

export const findByCompanyByNit = async (nit: string) => {
    const result = await db.query(
        `SELECT * FROM companies WHERE nit = $1`,
        [nit]
    );
    return result.rows[0];
};

export const deleteCompany = async (nit: string, status: string) => {
    console.log(nit, status);
    const result = await db.query(
        `UPDATE companies SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE nit = $2 RETURNING *`,
        [status, nit]
    );
    console.log(result.rows[0]);
    return result.rows[0];
};

export const toggleCompanyStatus = async (nit: string, status: string) => {
    const company = await findByCompanyByNit(nit);
    if (!company) {
        throw new Error('Company not found');
    }
    status = status ? "1" : "0";
    const result = await deleteCompany(nit, status);
    return result.rows;
};