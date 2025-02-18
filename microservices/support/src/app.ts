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

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/requests", getRequestsController);
app.get("/requests/:id", getRequestDetailController);
app.post("/requests", createRequestController);
app.put("/requests/:id/status", updateRequestStatusController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
