import { Request, Response } from "express";
import {
  createProductPromotion,
  deleteProductPromotion,
  disableByCompany,
  getProductPromotionById,
  getProductsPromotions,
  updateProductPromotion,
} from "../services/promotionService";

export const getPromotionsController = async (req: Request, res: Response) => {
  try {
    const promotions = await getProductsPromotions();
    res.status(200).json(promotions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPromotionsByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const promotions = await getProductPromotionById(req.params.id);
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createPromotionController = async (
  req: Request,
  res: Response
) => {
  try {
    const promotion = await createProductPromotion(req.body);
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updatePromotionController = async (
  req: Request,
  res: Response
) => {
  try {
    const promotion = await updateProductPromotion(req.params.id, req.body);
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deletePromotionController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteProductPromotion(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const disableByCompanyController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      company_id,
      product_id,
      state,
    } = req.body;
    const promotion = await disableByCompany(company_id, product_id, state);
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
