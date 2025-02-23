import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {
  getCompaniesController,
  createCompanyController,
  updateCompanyController,
  toggleCompanyStatusController,
} from "./controllers";
import { validateSchema } from "./middlewares/validation";

import { companySchema, searchCompanySchema, searchCompanyIDschema, editCompanySchema, statusSchema } from "./validators/company";
import { rateLimiter } from "./middlewares/rateLimiter";

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
  "/companies/:nit",
  rateLimiter,
  (req, res, next) =>
    validateSchema(req, res, next, {
      body:  editCompanySchema,
      params: searchCompanyIDschema,
    }),
  updateCompanyController
);

app.patch(
  "/companies/:nit/status",
  (req, res, next) =>
    validateSchema(req, res, next, {
      body: statusSchema,
      params: searchCompanyIDschema,
    }),
  toggleCompanyStatusController
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
