import { Request, Response } from 'express';
import { getPromotions, createPromotion, updatePromotion, deletePromotion } from '../services/promotionService';

export const getPromotionsController = async (req: Request, res: Response) => {
    try {
        const promotions = await getPromotions();
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const createPromotionController = async (req: Request, res: Response) => {
    try {
        const promotion = await createPromotion(req.body);
        res.status(201).json(promotion);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updatePromotionController = async (req: Request, res: Response) => {
    try {
        const promotion = await updatePromotion(req.params.id, req.body);
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deletePromotionController = async (req: Request, res: Response) => {
    try {
        await deletePromotion(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
