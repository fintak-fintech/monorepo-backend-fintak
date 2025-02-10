import { Request, Response } from 'express';
import { getLoans, createLoan, updateLoan, deleteLoan } from '../services/loanService';

export const getLoansController = async (req: Request, res: Response) => {
    try {
        const loans = await getLoans();
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const createLoanController = async (req: Request, res: Response) => {
    try {
        const loan = await createLoan(req.body);
        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateLoanController = async (req: Request, res: Response) => {
    try {
        const loan = await updateLoan(req.params.id, req.body);
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteLoanController = async (req: Request, res: Response) => {
    try {
        await deleteLoan(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
