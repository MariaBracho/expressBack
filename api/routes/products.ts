import { Router } from "express";
import ProductService from "../services/product";
import {
  deleteProductSchema,
  getProductsSchema,
  createProductSchema,
  updateProductSchema
} from "../schemas/products";
import validationHandler from "../middlewares/validator.handler";

const router = Router();
const service = new ProductService();
// get all products
// first params static then dynamic

// Si te preguntas cuántas funciones middleware puedes enviar como callback, la respuesta es: las que quieras. Esto siempre y cuando las separes con coma. Las puedes llamar si las definiste fuera, ejecutar o incluso llamar un array de funciones middlewares.

router.get(
  "/:id",
  validationHandler(getProductsSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.find(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req, res) => {
  const productsList = await service.getAll();
  res.status(200).json(productsList);
});

// create product
router.post(
  "/",
  validationHandler(createProductSchema, "body"),
  async (req, res) => {
    const { body } = req;
    res.status(201).json({
      message: "Product created successfully",
      data: await service.create(body)
    });
  }
);

// edit product
router.patch(
  "/:id",
  validationHandler(getProductsSchema, "params"),
  validationHandler(updateProductSchema, "body"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const product = await service.update(id, body);
      res.json({
        message: "Product updated successfully",
        data: product,
        id
      });
    } catch (error) {
      res.status(404).json({
        message: error.message
      });
    }
  }
);

// delete product
router.delete(
  "/:id",
  validationHandler(deleteProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await service.delete(id);
      res.json(message);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
