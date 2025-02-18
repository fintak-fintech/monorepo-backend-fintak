import dotenv from "dotenv";
dotenv.config({ path: '/workspaces/fintak/.env' }); 

import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {
  getCompaniesController,
  createCompanyController,
  updateCompanyController,
  deleteCompanyController,
} from "./controllers";
import { loginController } from './controllers/authController';
import { validateSchema } from "./middlewares/validation";
import { companySchema, searchCompanySchema } from "./validators/company";
import { rateLimiter } from "./middlewares/rateLimiter";
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/companies", authMiddleware, rateLimiter, getCompaniesController);
app.post(
  "/companies",
  authMiddleware,
  rateLimiter,
  (req, res, next) => validateSchema(req, res, next, { body: companySchema }),
  createCompanyController
);
app.put(
  "/companies/:id",
  authMiddleware,
  rateLimiter,
  (req, res, next) =>
    validateSchema(req, res, next, {
      body: companySchema,
      params: searchCompanySchema,
    }),
  updateCompanyController
);
app.delete("/companies/:id", authMiddleware, deleteCompanyController);

app.post('/login', loginController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
