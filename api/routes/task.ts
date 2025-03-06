import { Router } from 'express';
import TaskService from '../services/task.service';

const router = Router();
const service = new TaskService();

router.get('/', async (req, res) => {
  try {
    const taskList = await service.getAll();
    res.status(200).json(taskList);
    console.log(taskList);
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
});

export default router;
