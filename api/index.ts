import express from 'express';
import routerApi from './routes';
import {
  logErrors,
  errorHandler,
  boomHandler,
} from './middlewares/error.handler';
import { serve, setup } from 'swagger-ui-express';
import options from './utils/swaggerOptions';
import cors from 'cors';

import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const PORT = process.env.PORT ?? 3000;

// middlewares
app.use(express.json());

// cors
app.use(cors());

routerApi(app);

// los middlewares se ejecutan en orden

app.use(logErrors);
app.use(boomHandler);
app.use(errorHandler);

const specs = swaggerJsdoc(options);

app.use('/api-docs', serve, setup(specs, { explorer: true }));

// listen port
app.listen(PORT, () => {
  console.log(`mi port es : ${PORT}`);
});

// Middleware o lógica de intercambio de información entre aplicaciones, o Agente Intermedio,
// es un software que asiste a una aplicación para interactuar o comunicarse con otras aplicaciones,
//  o paquetes de programas, redes, hardware o sistemas operativos.
