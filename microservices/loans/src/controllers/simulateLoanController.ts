import { Request, Response } from 'express';
import { getLastSimulationByUser, getSimulationsByUser, saveSimulation } from '../services/simulateLoanService';

export const simulateLoan = async (req: Request, res: Response) => {
  const { amount, term, annual_interest, user_id } = req.body;

  if (!amount || !term || !annual_interest) {
    return res.status(400).json({ message: "all_fields_required" });
  }

  const monthly_interest = (annual_interest / 12) / 100;
  const fee = (amount * monthly_interest) / (1 - Math.pow(1 + monthly_interest, -term));

  try {
    let result = {
      amount: amount,
      term: term,
      annual_interest: annual_interest,
      monthly_interest: monthly_interest,
      simulation_result: fee.toFixed(2),
    }
    if (user_id) {
      await saveSimulation(user_id, amount, term, annual_interest, fee.toFixed(2));
    }
    res.json({ message: "simulate_loan_executed", simulation: result });
  } catch (error) {
    res.status(500).json({ message: "error_saving_simulate_loan", error });
  }
};

export const getSimulationsByUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const simulations = await getSimulationsByUser(userId);
    res.json({ message: "simulations_retrieved", simulations });
  } catch (error) {
    res.status(500).json({ message: "error_retrieving_simulations", error });
  }
};

export const getLastSimulationByUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const simulation = await getLastSimulationByUser(userId);
    res.json({ message: "last_simulation_retrieved", simulation });
  } catch (error) {
    res.status(500).json({ message: "error_retrieving_last_simulation", error });
  }
};
