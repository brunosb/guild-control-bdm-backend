import { injectable, inject } from 'tsyringe';

import AppError from '@shared/erros/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IClassesRepository from '../repositories/IClassesRepository';
import Class from '../infra/typeorm/entities/Class';

interface IRequest {
  class_id: string;
  emblemFilename: string;
}

@injectable()
class UpdateClassEmblemService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute_ascension({
    class_id,
    emblemFilename,
  }: IRequest): Promise<Class> {
    const classe = await this.classesRepository.findById(class_id);

    if (!classe) {
      throw new AppError('Class not found.', 401);
    }

    if (classe.avatar_ascension) {
      await this.storageProvider.deleteFile(classe.avatar_ascension);
    }

    const filename = await this.storageProvider.saveFile(emblemFilename);

    classe.avatar_ascension = filename;
    await this.classesRepository.save(classe);

    return classe;
  }

  public async execute_awakening({
    class_id,
    emblemFilename,
  }: IRequest): Promise<Class> {
    const classe = await this.classesRepository.findById(class_id);

    if (!classe) {
      throw new AppError('Class not found.', 401);
    }

    if (classe.avatar_awakening) {
      await this.storageProvider.deleteFile(classe.avatar_awakening);
    }

    const filename = await this.storageProvider.saveFile(emblemFilename);

    classe.avatar_awakening = filename;
    await this.classesRepository.save(classe);

    return classe;
  }
}

export default UpdateClassEmblemService;
