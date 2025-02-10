import { Request, Response } from 'express';
import { getCompanies, createCompany, updateCompany, deleteCompany } from '../services/companyService';

export const getCompaniesController = async (req: Request, res: Response) => {
    try {
        const companies = await getCompanies();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const createCompanyController = async (req: Request, res: Response) => {
    try {
        const company = await createCompany(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateCompanyController = async (req: Request, res: Response) => {
    try {
        const company = await updateCompany(req.params.id, req.body);
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteCompanyController = async (req: Request, res: Response) => {
    try {
        await deleteCompany(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};