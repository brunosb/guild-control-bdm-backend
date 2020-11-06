import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/erros/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  whatsapp: string;
  cp: number;
  classe: string;
  sub_class: string;
  permission: string;
  password?: string;
  user_id_authenticated: string;
  user_permission_authenticated: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    name,
    cp,
    permission,
    whatsapp,
    classe,
    sub_class,
    password,
    user_id_authenticated,
    user_permission_authenticated,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedName = await this.usersRepository.findByName(name);

    if (userWithUpdatedName && userWithUpdatedName.id !== id) {
      throw new AppError('Name already in use.');
    }

    if (user.permission === 'Master') {
      const masters = await this.usersRepository.findAllMasters();

      if (user_id_authenticated === user.id) {
        if (permission === 'Master') {
          user.permission = permission;
        } else {
          // verificar se há outro master para se auto alterar
          if (masters.length === 1) {
            throw new AppError('Choose another Master before.');
          }
          user.permission = permission;
        }
      } else {
        if (user_permission_authenticated !== 'Master') {
          throw new AppError('It is not allowed to change a master permission');
        } else if (masters.length >= 2) {
          user.permission = permission;
        } else {
          throw new AppError('Choose another Master before.');
        }

        user.permission = permission;
      }
    } else {
      user.permission = permission;
    }

    user.name = name;
    user.whatsapp = whatsapp;
    user.cp = cp;
    user.classe = classe;
    user.sub_class = sub_class;

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    const userUpdate = await this.usersRepository.save(user);

    await this.cacheProvider.invalidate('users-list');

    return userUpdate;
  }
}

export default UpdateProfileService;
