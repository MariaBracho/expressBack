import productsRouter from "./products";
import express from "express";
import type core from "express";

export default function routerApi(app: core.Express) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", productsRouter);
}
