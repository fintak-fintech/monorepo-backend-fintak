import { Request, Response } from 'express';
import { getReports, createReport, updateReport, deleteReport } from '../services/reportService';

export const getReportsController = async (req: Request, res: Response) => {
    try {
        const reports = await getReports();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const createReportController = async (req: Request, res: Response) => {
    try {
        const report = await createReport(req.body);
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateReportController = async (req: Request, res: Response) => {
    try {
        const report = await updateReport(req.params.id, req.body);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteReportController = async (req: Request, res: Response) => {
    try {
        await deleteReport(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
