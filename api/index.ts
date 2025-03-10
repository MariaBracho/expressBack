import express from 'express';
import routerApi from './routes';
import {
  logErrors,
  errorHandler,
  boomHandler,
} from './middlewares/error.handler';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(cors());

routerApi(app);

// los middlewares se ejecutan en orden
app.use(logErrors);
app.use(boomHandler);
app.use(errorHandler);

// listen port
app.listen(PORT, () => {
  console.log(`mi port es : ${PORT}`);
});
