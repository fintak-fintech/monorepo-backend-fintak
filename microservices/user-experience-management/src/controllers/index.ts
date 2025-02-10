import { Request, Response } from 'express';
import { getUserExperiences, createUserExperience, updateUserExperience, deleteUserExperience } from '../services/userExperienceService';

export const getUserExperiencesController = async (req: Request, res: Response) => {
    try {
        const userExperiences = await getUserExperiences();
        res.status(200).json(userExperiences);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const createUserExperienceController = async (req: Request, res: Response) => {
    try {
        const userExperience = await createUserExperience(req.body);
        res.status(201).json(userExperience);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateUserExperienceController = async (req: Request, res: Response) => {
    try {
        const userExperience = await updateUserExperience(req.params.id, req.body);
        res.status(200).json(userExperience);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteUserExperienceController = async (req: Request, res: Response) => {
    try {
        await deleteUserExperience(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
