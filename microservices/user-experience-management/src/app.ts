import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {
  getBenefitsController,
  createBenefitController,
  updateBenefitController,
  deleteBenefitController,
  toggleBenefitStatusController,
} from './controllers/benefitsController';
import {
  getTipsController,
  createTipController,
  updateTipController,
  deleteTipController,
  toggleTipStatusController,
} from './controllers/tipsController';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/benefits', getBenefitsController);
app.post('/benefits', (req: Request, res: Response, next: NextFunction) => authMiddleware(req, res, next), createBenefitController);
app.put('/benefits/:id', updateBenefitController);
app.post('/benefits/:id/delete', deleteBenefitController);
app.patch('/benefits/:id/toggle', toggleBenefitStatusController);

app.get('/tips', getTipsController);
app.post('/tips', createTipController);
app.put('/tips/:id', updateTipController);
app.post('/tips/:id/delete', deleteTipController);
app.patch('/tips/:id/toggle', toggleTipStatusController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
