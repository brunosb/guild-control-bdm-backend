import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import UpdateClassEmblemService from '@modules/users/services/UpdateClassEmblemService';

export default class ClassesEmblemController {
  public async update_emblem_ascension(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateClassEmblem = container.resolve(UpdateClassEmblemService);

    const classe = await updateClassEmblem.execute_ascension({
      class_id: request.body.class_id,
      emblemFilename: request.file.filename,
    });

    return response.json(classToClass(classe));
  }

  public async update_emblem_awakening(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateClassEmblem = container.resolve(UpdateClassEmblemService);

    const classe = await updateClassEmblem.execute_awakening({
      class_id: request.body.class_id,
      emblemFilename: request.file.filename,
    });

    return response.json(classToClass(classe));
  }
}
