import { Request, Response } from "express";
import { getLoans, createLoan, getLoansByUserId, getLoanById } from "../services/loanService";

export const getLoansController = async (req: Request, res: Response) => {
  try {
    const loans = await getLoans();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createLoanController = async (req: Request, res: Response) => {
  try {
    const loan = await createLoan(req.body);
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getLoanByIdController = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res
      .status(400)
      .json({ error: 'id is missing' });
  }

  try {
    const loan = await getLoanById(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getLoansByUserIdController = async (
  req: Request,
  res: Response
) => {
  if (!req.params.userId) {
    return res
      .status(400)
      .json({ error: 'user id is missing' });
  }

  try {
    const loans = await getLoansByUserId(req.params.userId);
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
