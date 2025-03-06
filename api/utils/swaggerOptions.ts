const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Products API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html"
      },
      contact: {
        name: "Products API",
        url: "https://logrocket.com",
        email: "info@email.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server"
      },
      {
        url: "https://express-back-git-main-mariabracho.vercel.app/api/v1",
        description: "Production server"
      }
    ]
  },
  apis: ["api/routesDoc/*.ts"]
};

export default options;
