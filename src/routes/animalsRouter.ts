import { Router } from 'express';
import { container } from '../ioc/inversify.config';
import { TYPES } from '../domains/types/types';
import { IAnimalsController } from '../domains/animals/controllers/animalsController';
import { requestValidator } from '../middlewares/requestValidator';
import { GetOneSchema } from '../domains/animals/schemas/getOneSchema';

export const animalsRouter = Router();

const animalsController = container.get<IAnimalsController>(
  TYPES.IAnimalsController
);

animalsRouter.route('/all').get(animalsController.getAll);

animalsRouter
  .route('/:id')
  .get(requestValidator(GetOneSchema), animalsController.getOne)

  .patch(animalsController.updateByContext);
