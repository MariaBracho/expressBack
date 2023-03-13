import { Router } from "express";
import ProductService from "../services/product";

const router = Router();
const service = new ProductService();
// get all products
// first params static then dynamic

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const product = service.find(id);
  res.status(200).json(product);
});

router.get("/", (req, res) => {
  const productsList = service.getAll();
  res.status(200).json(productsList);
});

// create product
router.post("/", (req, res) => {
  const { body } = req;
  res.status(201).json({
    message: "Product created successfully",
    data: service.create(body)
  });
});

// edit product
router.patch("/:id", (req, res) => {
  const { body } = req;
  const { id } = req.params;
  res.json({
    message: "Product updated successfully",
    data: service.update(id, body),
    id
  });
});

// delete product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const message = service.delete(id);
  res.json(message);
});

export default router;
