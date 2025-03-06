import { notFound, conflict } from '@hapi/boom';
import { type User } from './../types/users';

import sequelize from './../libs/sequelize';

class UserService {
  user: User[] = [];

  constructor() {
    this.user = [];
  }

  async getAll() {
    const result = await sequelize.models.User.findAll();
    return result;
  }

  async find(id: number) {
    const User: any = await sequelize.models.User.findByPk(id);
    if (!User) {
      throw notFound('User not found');
    }
    if (User.isblocked) {
      throw conflict('User is blocked');
    }
    return User;
  }

  async create(body: any) {
    const findUSer = await sequelize.models.User.findOne({
      where: {
        email: body.email,
      },
    });
    if (findUSer) {
      throw conflict('email already exist');
    }
    const User = await sequelize.models.User.create(body);
    return User;
  }

  async update(id: number, body: User) {
    const User = await this.find(id);
    const result = await User.update(body, {
      where: {
        id,
      },
    });

    return result;
  }

  async delete(id: number) {
    const User = await this.find(id);
    await User.destroy({
      where: {
        id,
      },
    });
    return User;
  }
}

export default UserService;
