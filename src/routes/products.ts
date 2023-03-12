import { Router } from "express";
import { faker } from "@faker-js/faker";

const router = Router();

// get all products
// first params static then dynamic
router.get("/", (req, res) => {
  const { size = 10 } = req.query;
  const arr = new Array(Number(size)).fill(0);

  const productsList = arr?.map((item) => {
    return {
      id: faker.helpers.unique(faker.datatype.uuid),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.imageUrl()
    };
  });
  res.status(200).json(productsList);
});

router.post("/", (req, res) => {
  const { body } = req;
  res.status(201).json({
    message: "Product created successfully",
    data: body
  });
});

export default router;
