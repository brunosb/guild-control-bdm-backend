import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      whatsapp,
      cp,
      classe,
      sub_class,
      permission,
      password,
    } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      id,
      name,
      whatsapp,
      cp,
      classe,
      sub_class,
      permission,
      password,
      user_id_authenticated: request.user.id,
      user_permission_authenticated: request.user.permission,
    });

    return response.json(classToClass(user));
  }
}
