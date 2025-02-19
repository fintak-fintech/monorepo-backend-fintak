import { db } from '../config/db';

export const getEmployees = async () => {
    const result = await db.query('SELECT * FROM employees');
    return result.rows;
};

export const createEmployee = async (employeeData: { 
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
        `INSERT INTO employees (
            first_name, last_name, email, position, salary, company_id, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [first_name, last_name, email, position, salary, company_id, status]
    );
    return result.rows[0];
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
    await db.query('DELETE FROM employees WHERE id = $1', [id]);
};
