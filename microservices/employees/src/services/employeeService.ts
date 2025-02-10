import { db } from '../config/db';

export const getEmployees = async () => {
    const result = await db.query('SELECT * FROM employees');
    return result.rows;
};

export const createEmployee = async (employeeData: { name: string; position: string }) => {
    const { name, position } = employeeData;
    const result = await db.query(
        'INSERT INTO employees (name, position) VALUES ($1, $2) RETURNING *',
        [name, position]
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
