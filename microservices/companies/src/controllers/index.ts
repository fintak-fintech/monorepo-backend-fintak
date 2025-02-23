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
        req.body.status = "1"; 
        await createCompany(req.body);
        res.status(201).json({ message: 'Company created successfully' });
    } catch (error) {
        const err = error as Error;
        if (err.message === 'Company with this nit already exists') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: (error as Error).message });
        }
    }
};

export const updateCompanyController = async (req: Request, res: Response) => {
    try {
        const { nit } = req.params;
        await updateCompany(nit, req.body);
        res.status(200).json({ message: 'Company edit successfully' });
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