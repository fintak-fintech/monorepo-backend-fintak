import { Request, Response } from 'express';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService';

export const getEmployeesController = async (req: Request, res: Response) => {
    try {
        const employees = await getEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const createEmployeeController = async (req: Request, res: Response) => {
    try {
        req.body.status = "1"; 
        await createEmployee(req.body);
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
        const err = error as Error;
        if (err.message === 'Employee with this identification number or email already exists') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: (error as Error).message });
        }
    }
};

export const updateEmployeeController = async (req: Request, res: Response) => {
    try {
        const employee = await updateEmployee(req.params.id, req.body);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteEmployeeController = async (req: Request, res: Response) => {
    try {
        await deleteEmployee(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
