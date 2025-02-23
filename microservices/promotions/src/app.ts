import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import {
  getPromotionsController,
  createPromotionController,
  updatePromotionController,
  getPromotionsByIdController,
  disableByCompanyController,
} from "./controllers";
import { helmetInit } from "./config/helmet";
import { validateSchema } from "./middlewares/validation";
import { productPromotionDisabledSchema, productPromotionSchema, productPromotionUpdateSchema } from "./validators/schemas";

dotenv.config();

let app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "development") app = helmetInit(app);

app.use((req, res, next) => {
  const method = req.method.toLowerCase();
  const SUPPORTED_METHODS = ["get", "post", "put", "patch"];
  if (!SUPPORTED_METHODS.includes(method)) {
    return res.status(400).json({ error: "incorrect petition, try again" });
  }

  // logger.info(`Request URL: ${req.originalUrl}`);
  next();
});

app.get("/products", getPromotionsController);
app.get("/products/:id", getPromotionsByIdController);
app.post("/products", (req, res, next) => validateSchema(req, res, next, { body: productPromotionSchema }), createPromotionController);
app.put("/products/:id", (req, res, next) => validateSchema(req, res, next, { body: productPromotionUpdateSchema }), updatePromotionController);
app.put('/products/disable',
  (req, res, next) => validateSchema(req, res, next, { body: productPromotionDisabledSchema }),
  disableByCompanyController);
// app.delete('/products/:id', deletePromotionController);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
