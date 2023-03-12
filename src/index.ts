import express from "express";
import routerApi from "./routes";

const app = express();
const PORT = 3000;

// middlewares
app.use(express.json());

routerApi(app);

// listen port
app.listen(PORT, () => {
  console.log(`mi port es : ${PORT}`);
});

// Middleware o lógica de intercambio de información entre aplicaciones, o Agente Intermedio,
// es un software que asiste a una aplicación para interactuar o comunicarse con otras aplicaciones,
//  o paquetes de programas, redes, hardware o sistemas operativos.
