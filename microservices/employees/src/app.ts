import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {
  getEmployeesController,
  createEmployeeController,
  updateEmployeeController,
  toggleEmployeeStatusController,
} from "./controllers";
import { employeeSchema, searchEmployeeSchema, editemployeeSchema, statusSchema, searchEmployeeIDSchema } from "./validators/employee";
import { validateSchema } from "./middlewares/validation";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/employees", getEmployeesController);
app.post(
  "/employees",
  (req, res, next) => validateSchema(req, res, next, { body: employeeSchema }),
  createEmployeeController
);
app.put(
  "/employees/:identification_number",
  (req, res, next) =>
    validateSchema(req, res, next, {
      body: editemployeeSchema,
      params: searchEmployeeIDSchema,
    }),
  updateEmployeeController
);

app.patch(
  "/employees/:identification_number/status",
  (req, res, next) =>
    validateSchema(req, res, next, {
      body: statusSchema,
      params: searchEmployeeIDSchema,
    }),
  toggleEmployeeStatusController
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});