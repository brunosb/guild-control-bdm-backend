import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClassService from '@modules/users/services/CreateClassService';
import ListAllClassesService from '@modules/users/services/ListAllClassesService';
import { classToClass } from 'class-transformer';

export default class ClassesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, name_ascension, name_awakening } = request.body;

    const createClass = container.resolve(CreateClassService);

    const classe = await createClass.execute({
      name,
      name_ascension,
      name_awakening,
    });

    return response.json(classe);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listAllClasses = container.resolve(ListAllClassesService);

    const classes = await listAllClasses.execute();
    return response.json(classToClass(classes));
  }
}
