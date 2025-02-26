import dotenv from "dotenv";
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
import { validateSchema } from "./middlewares/validation";
import { benefitSchema, benefitIdSchema, benefitUpdateSchema } from "./validators/benefitsSchema";
import { tipSchema } from "./validators/tipsSchema";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/benefits',
  (req, res, next) => validateSchema(req, res, next, { query: benefitSchema }),
  getBenefitsController
);
app.post('/benefits',
  (req, res, next) => validateSchema(req, res, next, { body: benefitSchema }),
  (req: Request, res: Response, next: NextFunction) => authMiddleware(req, res, next),
  createBenefitController,
);
app.put('/benefits/:id',
  (req, res, next) => validateSchema(req, res, next, { query: benefitIdSchema, body: benefitUpdateSchema }),
  updateBenefitController);
app.post('/benefits/:id/delete',
  (req, res, next) => validateSchema(req, res, next, { query: benefitIdSchema }),
  deleteBenefitController);
app.patch('/benefits/:id/toggle',
  (req, res, next) => validateSchema(req, res, next, { query: benefitIdSchema }),
  toggleBenefitStatusController);

app.get('/tips', getTipsController);
app.post('/tips',
  (req, res, next) => validateSchema(req, res, next, { body: tipSchema }),
  createTipController);

app.put('/tips/:id',
  (req, res, next) => validateSchema(req, res, next, { query: benefitIdSchema, body: tipSchema }),
  updateTipController);
app.post('/tips/:id/delete',
  (req, res, next) => validateSchema(req, res, next, { query: benefitIdSchema }),
  deleteTipController);
app.patch('/tips/:id/toggle',
  (req, res, next) => validateSchema(req, res, next, { query: benefitIdSchema }),
  toggleTipStatusController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
