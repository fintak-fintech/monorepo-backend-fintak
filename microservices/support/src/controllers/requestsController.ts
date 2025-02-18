import { Request, Response } from "express";
import {
  getRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
} from "../services/requestService";

export const getRequestsController = async (req: Request, res: Response) => {
  try {
    const requests = await getRequests();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRequestDetailController = async (
  req: Request,
  res: Response
) => {
  try {
    const request = await getRequestById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createRequestController = async (req: Request, res: Response) => {
  try {
    const request = await createRequest(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateRequestStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.body;
    const request = await updateRequestStatus(req.params.id, status);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
