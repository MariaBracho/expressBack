import sequelize from '../libs/sequelize';

class TaskService {
  task: any[];

  constructor() {
    this.task = [];
  }

  async getAll() {
    const sql = 'SELECT * FROM task';
    const [data] = await sequelize.query(sql);
    return data;
  }
}

export default TaskService;
