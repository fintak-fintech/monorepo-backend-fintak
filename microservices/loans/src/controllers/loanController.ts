import { Request, Response } from "express";
import {
  getLoans,
  createLoan,
  getLoansByUserId,
  getLoanById,
  getLoansByCompany,
  updateApprovalDate,
  updatePaymentDate,
} from "../services/loanService";
import { generateAmortizationTable } from "../utils/amortizationTable";

export const getLoansController = async (req: Request, res: Response) => {
  try {
    const { status, page, limit } = req.query;
    const currentPage = page ? parseInt(page as string) : 1;
    const currentLimit = limit ? parseInt(limit as string) : 20;
    const currentStatus = status ? (status as string) : "all";
    const offset = (currentPage - 1) * currentLimit;

    const loans = await getLoans({
      status: currentStatus,
      page: currentPage,
      limit: currentLimit,
      offset,
    });
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
  try {
    const { loan_id, user_id } = req.params;

    const loan = await getLoanById({
      loan_id,
      user_id,
    });
    if (!loan) {
      return res.status(404).json({ message: "loan_not_found" });
    }

    loan.amortization_schedule = generateAmortizationTable(
      loan.amount,
      loan.term,
      loan.interest_rate
    ) ?? [];

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
    return res.status(400).json({ message: "user_id_missing" });
  }
  const { status, page, limit } = req.query;
  const currentPage = page ? parseInt(page as string) : 1;
  const currentLimit = limit ? parseInt(limit as string) : 10;
  const currentStatus = status ? (status as string) : "all";
  const offset = (currentPage - 1) * currentLimit;

  try {
    const loans = await getLoansByUserId({
      user_id: req.params.userId,
      filter: {
        status: currentStatus,
        page: currentPage,
        limit: currentLimit,
        offset,
      },
    });
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getListLoansByCompanyController = async (
  req: Request,
  res: Response
) => {
  const { company_id } = req.params;

  if (!company_id) {
    return res.status(400).json({ message: "company_id_missing" });
  }

  try {
    const loans = await getLoansByCompany(company_id);
    res.json({ message: "Solicitudes de crédito", loans });
  } catch (err) {
    console.error("Error al obtener préstamos:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateApprovalDateController = async (
  req: Request,
  res: Response
) => {
  const loan_id = req.params.loan_id;
  if (!loan_id) {
    return res.status(400).json({ error: "loan_id_not_found" });
  }

  try {
    const loan = await updateApprovalDate(
      loan_id,
      req.body.approval_date
    );
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updatePaymentDateController = async (
  req: Request,
  res: Response
) => {
  const loan_id = req.params.loan_id;
  if (!loan_id) {
    return res.status(400).json({ error: "loan_id_not_found" });
  }

  try {
    const loan = await updatePaymentDate(loan_id, req.body.payment_date);
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
