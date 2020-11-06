import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IClassesProvider from '../providers/ClassesProvider/models/IClassesProvider';

interface IRequest {
  name: string;
  whatsapp: string;
  permission: 'Master' | 'Officer' | 'Player';
  classe: string;
  sub_class: 'Awakening' | 'Ascension';
  cp: number;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('ClassesProvider')
    private classesProvider: IClassesProvider,
  ) {}

  public async execute({
    name,
    whatsapp,
    permission,
    classe,
    sub_class,
    cp,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByName(name);

    if (checkUserExists) {
      throw new AppError('Family name already exists.');
    }

    if (
      permission !== 'Master' &&
      permission !== 'Officer' &&
      permission !== 'Player'
    ) {
      throw new AppError('Permission is not exist.');
    }

    if (sub_class !== 'Awakening' && sub_class !== 'Ascension') {
      throw new AppError('Sub Class is not exist.');
    }

    const checkClassExists = await this.classesProvider.existClass(classe);

    if (!checkClassExists) {
      throw new AppError('Class is not exist.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      whatsapp,
      permission,
      sub_class,
      classe,
      cp,
      active: true,
      strike: 0,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidate('users-list');

    return user;
  }
}

export default CreateUserService;
