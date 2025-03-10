import { Router } from 'express';

const router = Router();

// GET /api/hello endpoint to return a message

router.get('/', (req, res) => {
  res.send('Hello World!!!! :D');
});

export default router;
