import { Container } from 'inversify';
import {
  AnimalsRepository,
  IAnimalsRepository,
} from '../domains/animals/repository/animalsRepository';
import { TYPES } from '../domains/types/types';
import {
  AnimalsService,
  IAnimalsService,
} from '../domains/animals/services/animalsService';
import {
  AnimalsController,
  IAnimalsController,
} from '../domains/animals/controllers/animalsController';

export const container = new Container();

container
  .bind<IAnimalsRepository>(TYPES.IAnimalsRepository)
  .to(AnimalsRepository);

container.bind<IAnimalsService>(TYPES.IAnimalsService).to(AnimalsService);

container
  .bind<IAnimalsController>(TYPES.IAnimalsController)
  .to(AnimalsController);
