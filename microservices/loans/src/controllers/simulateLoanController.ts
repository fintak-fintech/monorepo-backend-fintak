import { Request, Response } from 'express';
import { getLastSimulationByUser, getSimulationsByUser, saveSimulation } from '../services/simulateLoanService';
import { getInterestRate } from '../services/interestRateService';

const MAX_AMOUNT = 50000;
const MAX_TERM = 60;

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

  const monthly_interest = (interest / 12) / 100;
  const fee = (amount * monthly_interest) / (1 - Math.pow(1 + monthly_interest, -term));

  const total_interest = (fee * term) - amount;
  const total_cost = amount + total_interest;

  let balance = amount;
  const amortization_table = [];
  for (let i = 1; i <= term; i++) {
    const interest_payment = balance * monthly_interest;
    const principal_payment = fee - interest_payment;
    balance -= principal_payment;

    amortization_table.push({
      month: i,
      interest_payment: interest_payment.toFixed(2),
      principal_payment: principal_payment.toFixed(2),
      total_payment: fee.toFixed(2),
      remaining_balance: balance.toFixed(2)
    });
  }

  try {
    let result = {
      amount,
      term,
      annual_interest,
      monthly_interest,
      simulation_result: fee.toFixed(2),
      total_interest: total_interest.toFixed(2),
      total_cost: total_cost.toFixed(2),
      amortization_table
    };

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
