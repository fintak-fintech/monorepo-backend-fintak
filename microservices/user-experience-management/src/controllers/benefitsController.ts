import { Request, Response } from 'express';
import {
  getBenefits,
  createBenefit,
  updateBenefit,
  deleteBenefit,
  toggleBenefitStatus,
  getBenefitById,
} from '../services/benefitService';

// Get all benefits
export const getBenefitsController = async (req: Request, res: Response) => {
  try {
    const { category, orderBy } = req.query;
    const benefits = await getBenefits(String(category ?? ''), String(orderBy));
    res.status(200).json(benefits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch benefits' });
  }
};

// Create a new benefit
export const createBenefitController = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newBenefit = await createBenefit({ title, description });
    res.status(201).json(newBenefit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create benefit' });
  }
};

// Update an existing benefit
export const updateBenefitController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedBenefit = await updateBenefit(id, { title, description });
    if (!updatedBenefit) {
      return res.status(404).json({ error: 'Benefit not found' });
    }
    res.status(200).json(updatedBenefit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update benefit' });
  }
};

// Delete a benefit
export const deleteBenefitController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteBenefit(id);
    res.status(200).json({ message: 'Benefit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete benefit' });
  }
};

// Enable/Disable a benefit
export const toggleBenefitStatusController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBenefit = await toggleBenefitStatus(id);
    if (!updatedBenefit) {
      return res.status(404).json({ error: 'Benefit not found' });
    }
    res.status(200).json(updatedBenefit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update benefit status' });
  }
};

export const getBenefitByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const benefit = await getBenefitById(req.params.id);
    res.status(200).json(benefit);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};