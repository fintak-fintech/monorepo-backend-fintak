import { Request, Response } from 'express';
import {
  getTips,
  createTip,
  updateTip,
  deleteTip,
  toggleTipStatus,
} from '../services/tipService';

// Get all tips
export const getTipsController = async (req: Request, res: Response) => {
  try {
    const tips = await getTips();
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
};

// Create a new tip
export const createTipController = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const newTip = await createTip({ title, content });
    res.status(201).json(newTip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tip' });
  }
};

// Update an existing tip
export const updateTipController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedTip = await updateTip(id, { title, content });
    if (!updatedTip) {
      return res.status(404).json({ error: 'Tip not found' });
    }
    res.status(200).json(updatedTip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tip' });
  }
};

// Delete a tip
export const deleteTipController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTip(id);
    res.status(200).json({ message: 'Tip deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tip' });
  }
};

// Enable/Disable a tip
export const toggleTipStatusController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTip = await toggleTipStatus(id);
    if (!updatedTip) {
      return res.status(404).json({ error: 'Tip not found' });
    }
    res.status(200).json(updatedTip);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tip status' });
  }
};
