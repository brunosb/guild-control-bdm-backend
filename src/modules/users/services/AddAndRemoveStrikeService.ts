import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  operation: 'add' | 'remove' | 'removeAll';
}

@injectable()
class AddAndRemoveStrikeService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, operation }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (
      operation !== 'add' &&
      operation !== 'remove' &&
      operation !== 'removeAll'
    ) {
      throw new AppError('Operation not exist');
    }

    switch (operation) {
      case 'add':
        if (user.strike) {
          user.strike += 1;
        } else {
          user.strike = 1;
        }
        break;
      case 'remove':
        if (user.strike) {
          if (user.strike > 0) {
            user.strike -= 1;
          } else {
            user.strike = 0;
          }
        } else {
          user.strike = 0;
        }
        break;
      case 'removeAll':
        user.strike = 0;
        break;
      default:
        user.strike = 0;
    }

    await this.cacheProvider.invalidate('users-list');

    return this.usersRepository.save(user);
  }
}

export default AddAndRemoveStrikeService;
