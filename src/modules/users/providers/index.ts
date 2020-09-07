import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

import IClassesProvider from './ClassesProvider/models/IClassesProvider';
import ClassesProvider from './ClassesProvider/implementations/ClassesProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IClassesProvider>(
  'ClassesProvider',
  ClassesProvider,
);
