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
import { validateSchema } from "./middlewares/validation";
import { companySchema, searchCompanySchema } from "./validators/company";
import { rateLimiter } from "./middlewares/rateLimiter";

dotenv.config()

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/companies", rateLimiter, getCompaniesController);
app.post(
  "/companies",
  rateLimiter,
  (req, res, next) => validateSchema(req, res, next, { body: companySchema }),
  createCompanyController
);
app.put(
  "/companies/:id",
  rateLimiter,
  (req, res, next) =>
    validateSchema(req, res, next, {
      body: companySchema,
      params: searchCompanySchema,
    }),
  updateCompanyController
);
app.delete("/companies/:id", deleteCompanyController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
