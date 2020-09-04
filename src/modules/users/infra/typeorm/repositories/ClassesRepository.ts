import IClassesRepository from '@modules/users/repositories/IClassesRepository';
import { Repository, getRepository } from 'typeorm';
import ICreateClassesDTO from '@modules/users/dtos/ICreateClassesDTO';
import Class from '../entities/Class';

class ClassesRepository implements IClassesRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  public async findById(id: string): Promise<Class | undefined> {
    const classe = await this.ormRepository.findOne(id);
    return classe;
  }

  public async findByName(name: string): Promise<Class | undefined> {
    const classe = await this.ormRepository.findOne({ where: { name } });
    return classe;
  }

  public async findAll(): Promise<Class[]> {
    const classes = await this.ormRepository.find();
    return classes;
  }

  public async create(classData: ICreateClassesDTO): Promise<Class> {
    const classe = this.ormRepository.create(classData);

    await this.ormRepository.save(classe);
    return classe;
  }

  public async save(classe: Class): Promise<Class> {
    return this.ormRepository.save(classe);
  }
}

export default ClassesRepository;
