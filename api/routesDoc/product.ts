/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The Products API
 * /products:
 *   get:
 *     summary: Lists all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created product.
 *         content:
 *           application/json:
 *
 *       500:
 *         description: Some server error
 * /products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product response by id
 *         contens:
 *           application/json:
 *
 *       404:
 *         description: The book was not found
 *   put:
 *    summary: Update the product by the id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *
 *    responses:
 *      200:
 *        description: The product was updated
 *        content:
 *          application/json:
 *
 *      404:
 *        description: The product was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - image
 *         - isBlocked
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of your product
 *         image:
 *           type: string
 *           description: The image of your product
 *         isBlocked:
 *           type: boolean
 *           description: Whether you have blocked the product
 *
 *       example:
 *         id: 16a8f510-e5ab-43d1-a9f3-a9b73a937e0f
 *         name: The New Turing Omnibus
 *         image: https://loremflickr.com/640/480
 *         isBlocket: false
 *
 */
