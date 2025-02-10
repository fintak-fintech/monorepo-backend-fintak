import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {
  getFundersController,
  createFunderController,
  updateFunderController,
  deleteFunderController,
} from "./controllers";
import { funderSchema, searchFunderSchema } from "./validators/funder";
import { validateSchema } from "./middlewares/validation";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/funders", getFundersController);
app.post(
  "/funders",
  (req, res, next) => validateSchema(req, res, next, { body: funderSchema }),
  createFunderController
);
app.put(
  "/funders/:id",
  (req, res, next) =>
    validateSchema(req, res, next, {
      body: funderSchema,
      params: searchFunderSchema,
    }),
  updateFunderController
);
app.delete("/funders/:id", deleteFunderController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
