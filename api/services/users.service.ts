import { notFound, conflict } from '@hapi/boom';
import sequelize from '@/libs/sequelize';
import type { User } from '@/types/users';
import type { CreateUser, UpdateUser } from '@/schemas/users';
import { Model } from 'sequelize';

type UserModel = Model & User;

class UserService {
  user: User[] = [];

  constructor() {
    this.user = [];
  }

  async getAll() {
    return await sequelize.models.User.findAll();
  }

  async find(id: number) {
    const user = (await sequelize.models.User.findByPk(id)) as UserModel;

    if (!user) {
      throw notFound('User not found');
    }

    if (user.isblocked) {
      throw conflict('User is blocked');
    }
    return user;
  }

  async create(body: CreateUser) {
    const findUSer = await sequelize.models.User.findOne({
      where: {
        email: body.email,
      },
    });
    if (findUSer) {
      throw conflict('email already exist');
    }
    return await sequelize.models.User.create(body);
  }

  async update(id: number, body: UpdateUser) {
    const User = await this.find(id);
    return await User.update(body, {
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const User = (await this.find(id)) as UserModel;
    await User.destroy();
    return User;
  }
}

export default UserService;
