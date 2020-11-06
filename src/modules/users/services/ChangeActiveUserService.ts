import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  active: boolean;
  user_id_authenticated: string;
}

@injectable()
class ChangeActiveUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    active,
    user_id_authenticated,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    const userAuthenticated = await this.usersRepository.findById(
      user_id_authenticated,
    );

    if (!user) {
      throw new AppError('User not found');
    }

    if (user_id === user_id_authenticated) {
      throw new AppError('Not possible change active your-self');
    }

    if (user?.permission === 'Master') {
      if (userAuthenticated?.permission !== 'Master') {
        throw new AppError(
          'Not possible change active in any Master, only another master',
        );
      }
    }

    user.active = active;

    await this.cacheProvider.invalidate('users-list');

    return this.usersRepository.save(user);
  }
}

export default ChangeActiveUserService;
