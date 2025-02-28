import { Request, Response } from 'express';
import { getLastSimulationByUser, getSimulationsByUser, saveSimulation } from '../services/simulateLoanService';
import { getInterestRate } from '../services/interestRateService';
import { generateAmortizationTable } from '../utils/amortizationTable';

const MAX_AMOUNT = 500000000;
const MAX_TERM = 240;

export const createSimulateLoanController = async (req: Request, res: Response) => {
  const {
    amount,
    term,
    annual_interest,
    user_id,
    company_id,
  } = req.body;
  let interest = annual_interest;

  if (!amount || !term || !company_id) {
    return res.status(400).json({ message: "all_fields_required" });
  }

  if (amount > MAX_AMOUNT || term > MAX_TERM) {
    return res.status(400).json({ message: "exceeds_allowed_limits" });
  }

  if (!interest) {
    try {
      const company_annual_interest = await getInterestRate(company_id);
  
      if (!company_annual_interest) {
        return res.status(404).json({ message: "no_interest_rate_found" });
      }
      interest = company_annual_interest;
    } catch (error) {
      res.status(500).json({ message: "error_getting_interest_rate", error });
    }
  }

  const amortization_table = generateAmortizationTable(amount, term, interest);

  try {
    let result = {
      amount,
      term,
      annual_interest,
      ...amortization_table
    };

    if (user_id) {
      await saveSimulation(user_id, amount, term, annual_interest, Number(amortization_table.monthly_payment).toFixed(2));
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
