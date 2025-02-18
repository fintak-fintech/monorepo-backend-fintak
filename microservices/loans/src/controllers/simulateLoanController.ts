import { Request, Response } from 'express';
import { saveSimulation } from '../services/simulateLoanService';

export const simulateLoan = async (req: Request, res: Response) => {
  const { amount, term, annual_interest, user_id } = req.body;

  if (!amount || !term || !annual_interest || !user_id) {
    return res.status(400).json({ message: "all_fields_required" });
  }

  const monthly_interest = (annual_interest / 12) / 100;
  const fee = (amount * monthly_interest) / (1 - Math.pow(1 + monthly_interest, -term));

  try {
    const simulation = await saveSimulation(user_id, amount, term, annual_interest, fee.toFixed(2));
    res.json({ message: "simulate_loan_saved", simulation });
  } catch (error) {
    res.status(500).json({ message: "error_saving_simulate_loan", error });
  }
};
