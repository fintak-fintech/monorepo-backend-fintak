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

export const updateEmployee = async (id: string, employeeData: { name: string; position: string }) => {
    const { name, position } = employeeData;
    const result = await db.query(
        'UPDATE employees SET name = $1, position = $2 WHERE id = $3 RETURNING *',
        [name, position, id]
    );
    return result.rows[0];
};

export const deleteEmployee = async (id: string) => {
    await db.query('DELETE FROM employees WHERE id = $1', [id]);
};
