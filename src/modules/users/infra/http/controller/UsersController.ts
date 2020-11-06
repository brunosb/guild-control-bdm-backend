import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListAllUsersService from '@modules/users/services/ListAllUsersService';
import ChangeActiveUserService from '@modules/users/services/ChangeActiveUserService';
import AddAndRemoveStrikeService from '@modules/users/services/AddAndRemoveStrikeService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      whatsapp,
      permission,
      password,
      sub_class,
      classe,
      cp,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      whatsapp,
      permission,
      password,
      sub_class,
      classe,
      cp,
    });

    return response.json(classToClass(user));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listAllUsers = container.resolve(ListAllUsersService);

    const users = await listAllUsers.execute();
    return response.json(classToClass(users));
  }

  public async changeActive(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id, active } = request.body;

    const changeActiveUser = container.resolve(ChangeActiveUserService);

    const user = await changeActiveUser.execute({
      user_id,
      active,
      user_id_authenticated: request.user.id,
    });

    return response.json(classToClass(user));
  }

  public async AddAndRemoveStrike(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id, operation } = request.body;

    const addAndRemoveStrike = container.resolve(AddAndRemoveStrikeService);

    const user = await addAndRemoveStrike.execute({ user_id, operation });

    return response.json(classToClass(user));
  }
}
