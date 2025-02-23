import { db } from '../config/db';

export const getEmployees = async () => {
    const result = await db.query('SELECT * FROM employees');
    return result.rows;
};

export const createEmployee = async (employeeData: { 
    cognito_sub: string;
    first_name: string; 
    last_name: string; 
    identification_number: string;
    email: string; 
    position: string; 
    depto: string;
    phone: string;
    salary: number; 
    company_id: string; 
    status: string; 
}) => {
    const { cognito_sub, first_name, last_name, identification_number, email, position, depto, phone, salary, company_id, status } = employeeData;
    const isDuplicate = await checkDuplicateEmployee(identification_number, email);
    if (isDuplicate) {
        throw new Error('Employee with this identification number or email already exists');
    }

    const result = await db.query(
        `INSERT INTO employees (
            cognito_sub, first_name, last_name, identification_number, email, position, depto, phone, salary, company_id, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [cognito_sub, first_name, last_name, identification_number, email, position, depto, phone, salary, company_id, status]
    );
    return result.rows[0];
};

export const checkDuplicateEmployee = async (identification_number: string, email: string) => {
    const result = await db.query(
        `SELECT * FROM employees WHERE identification_number = $1 OR email = $2`,
        [identification_number, email]
    );
    return result.rows.length > 0;
};

export const updateEmployee = async (id: string, employeeData: { 
    first_name: string; 
    last_name: string; 
    email: string; 
    position: string; 
    salary: number; 
    company_id: string; 
    status: string; 
}) => {
    const { first_name, last_name, email, position, salary, company_id, status } = employeeData;
    const result = await db.query(
        `UPDATE employees SET 
            first_name = $1, last_name = $2, email = $3, position = $4, salary = $5, company_id = $6, status = $7, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $8 RETURNING *`,
        [first_name, last_name, email, position, salary, company_id, status, id]
    );
    return result.rows[0];
};

export const deleteEmployee = async (id: string) => {
    const result = await db.query(
        `UPDATE employees SET status = '0', updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
};
