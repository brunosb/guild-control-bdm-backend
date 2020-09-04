import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/erros/AppError';
import IClassesRepository from '../repositories/IClassesRepository';
import Class from '../infra/typeorm/entities/Class';

interface IRequest {
  name: string;
  name_awakening: string;
  name_ascension: string;
}

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    name_awakening,
    name_ascension,
  }: IRequest): Promise<Class> {
    const checkClassExists = await this.classesRepository.findByName(name);

    if (checkClassExists) {
      throw new AppError('Class already exists.');
    }

    const classe = await this.classesRepository.create({
      name,
      name_ascension,
      name_awakening,
    });

    await this.cacheProvider.invalidatePrefix('classes-list');

    return classe;
  }
}

export default CreateClassService;
