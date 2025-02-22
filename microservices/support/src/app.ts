import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import {
  getRequestDetailController,
  getRequestsController,
  createRequestController,
  updateRequestStatusController,
} from "./controllers/requestsController";
import { validateSchema } from "./middlewares/validation";
import { requestIdSchema, requestSchema } from "./validators/requestsSchema";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/requests", getRequestsController);
app.get("/requests/:id",
  (req, res, next) => validateSchema(req, res, next, { query: requestIdSchema }),
  getRequestDetailController);
app.post("/requests",
  (req, res, next) => validateSchema(req, res, next, { body: requestSchema }),
  createRequestController);
app.put("/requests/:id/status",
  (req, res, next) => validateSchema(req, res, next, { query: requestIdSchema }),
  updateRequestStatusController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
