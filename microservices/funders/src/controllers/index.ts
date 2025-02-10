import { Request, Response } from 'express';
import { getFunders, createFunder, updateFunder, deleteFunder } from '../services/funderService';

export const getFundersController = async (req: Request, res: Response) => {
    try {
        const funders = await getFunders();
        res.status(200).json(funders);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const createFunderController = async (req: Request, res: Response) => {
    try {
        const funder = await createFunder(req.body);
        res.status(201).json(funder);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateFunderController = async (req: Request, res: Response) => {
    try {
        const funder = await updateFunder(req.params.id, req.body);
        res.status(200).json(funder);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteFunderController = async (req: Request, res: Response) => {
    try {
        await deleteFunder(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
