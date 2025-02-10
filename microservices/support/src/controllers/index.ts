import { Request, Response } from 'express';
import { getSupports, createSupport, updateSupport, deleteSupport } from '../services/supportService';

export const getSupportsController = async (req: Request, res: Response) => {
    try {
        const supports = await getSupports();
        res.status(200).json(supports);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const createSupportController = async (req: Request, res: Response) => {
    try {
        const support = await createSupport(req.body);
        res.status(201).json(support);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateSupportController = async (req: Request, res: Response) => {
    try {
        const support = await updateSupport(req.params.id, req.body);
        res.status(200).json(support);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteSupportController = async (req: Request, res: Response) => {
    try {
        await deleteSupport(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
