import { injectable, inject } from 'tsyringe';

import IClassesRepository from '../repositories/IClassesRepository';
import Class from '../infra/typeorm/entities/Class';

@injectable()
class ListAllClassesService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  public async execute(): Promise<Class[]> {
    const classes = await this.classesRepository.findAll();

    return classes;
  }
}

export default ListAllClassesService;
