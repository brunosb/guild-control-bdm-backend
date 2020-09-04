import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IClassesRepository from '../repositories/IClassesRepository';

interface IRequest {
  name: string;
  whatsapp: string;
  permission: 'Leader' | 'Player';
  class_id: string;
  sub_class: 'Awakening' | 'Ascension';
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    whatsapp,
    permission,
    class_id,
    sub_class,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByName(name);

    if (checkUserExists) {
      throw new AppError('Family name already exists.');
    }

    if (permission !== 'Leader' && permission !== 'Player') {
      throw new AppError('Permission is not exist.');
    }

    if (sub_class !== 'Awakening' && sub_class !== 'Ascension') {
      throw new AppError('Sub Class is not exist.');
    }

    const checkClassExists = await this.classesRepository.findById(class_id);

    if (!checkClassExists) {
      throw new AppError('Class is not exist.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      whatsapp,
      permission,
      sub_class,
      class_id,
      active: true,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('users-list');

    return user;
  }
}

export default CreateUserService;
