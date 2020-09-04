import Class from '../infra/typeorm/entities/Class';
import ICreateClassesDTO from '../dtos/ICreateClassesDTO';

export default interface IClassesRepository {
  create(data: ICreateClassesDTO): Promise<Class>;
  save(classe: Class): Promise<Class>;
  findByName(name: string): Promise<Class | undefined>;
  findById(id: string): Promise<Class | undefined>;
  findAll(): Promise<Class[]>;
}
