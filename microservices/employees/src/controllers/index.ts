import { Request, Response } from "express";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeStatus,
  getEmployeesByCompanyId,
} from "../services/employeeService";

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
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    const err = error as Error;
    if (
      err.message ===
      "Employee with this identification number or email already exists"
    ) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: (error as Error).message });
    }
  }
};

export const updateEmployeeController = async (req: Request, res: Response) => {
  try {
    const { identification_number } = req.params;
    await updateEmployee(identification_number, req.body);
    res.status(200).json({ message: "Employee edit successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const toggleEmployeeStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { identification_number } = req.params;
    const { status } = req.body;
    await toggleEmployeeStatus(identification_number, status);
    res.status(200).json({ message: "Employee edited successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEmployeesByCompanyIdController = async (
  req: Request,
  res: Response
) => {
  const { company_id } = req.params;

  try {
    const employees = await getEmployeesByCompanyId(company_id);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
