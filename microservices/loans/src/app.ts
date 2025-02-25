import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import {
  getLoansController,
  createLoanController,
  getLoanByIdController,
  getLoansByUserIdController,
  getListLoansByCompanyController,
} from "./controllers/loanController";
import {
  getLastSimulationByUserController,
  getSimulationsByUserController,
  createSimulateLoanController,
} from "./controllers/simulateLoanController";
import { validateSchema } from "./middlewares/validation";
import { loanIdSchema, loanSchema } from "./validators/loanSchema";
import { simulateLoanSchema, userIdSchema } from "./validators/simulationSchema";

dotenv.config();

let app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
  const method = req.method.toLowerCase();
  const SUPPORTED_METHODS = ["get", "post", "put", "patch"];
  if (!SUPPORTED_METHODS.includes(method)) {
    return res.status(400).json({ error: "incorrect petition, try again" });
  }

  // logger.info(`Request URL: ${req.originalUrl}`);
  next();
});

app.get("/loans", getLoansController);
app.post(
  "/loans",
  (req, res, next) => validateSchema(req, res, next, { body: loanSchema }),
  createLoanController
);
app.get(
  "/loans/:loan_id/user/:user_id",
  (req, res, next) => validateSchema(req, res, next, { params: loanIdSchema }),
  getLoanByIdController
);
app.get(
  "/loans/user/:userId",
  (req, res, next) => validateSchema(req, res, next, { params: userIdSchema }),
  getLoansByUserIdController
);

app.post("/simulate-loan",
  (req, res, next) => validateSchema(req, res, next, { body: simulateLoanSchema }),
  createSimulateLoanController
);
app.get("/simulations/:userId",
  (req, res, next) => validateSchema(req, res, next, { query: userIdSchema }),
  getSimulationsByUserController
);
app.get("/last-simulation/:userId",
  (req, res, next) => validateSchema(req, res, next, { query: userIdSchema }),
  getLastSimulationByUserController
);
app.get("/loans/company/:company_id",
  (req, res, next) => validateSchema(req, res, next, { query: userIdSchema }),
  getListLoansByCompanyController
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
