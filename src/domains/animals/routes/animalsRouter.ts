import { Router } from 'express';
import { container } from '../../../ioc/inversify.config';
import { TYPES } from '../../types/types';
import { IAnimalsController } from '../controllers/animalsController';
import { requestValidator } from '../../../middlewares/requestValidator';
import { GetOneSchema } from '../schemas/getOneSchema';
import { UpdateByIdSchema } from '../schemas/updateByIdSchema';
import {
  CreateAnimalSchema,
  CreateMultipleAnimalSchema,
} from '../schemas/createSchema';
import { CreateAnimalsByTypeSchema } from '../schemas/createByTypeSchema';

export const animalsRouter = Router();

const animalsController = container.get<IAnimalsController>(
  TYPES.IAnimalsController
);

animalsRouter.route('/all').get(animalsController.getAll);

animalsRouter
  .route('/add')
  .post(requestValidator(CreateAnimalSchema), animalsController.create);

animalsRouter
  .route('/add/animals')
  .post(
    requestValidator(CreateMultipleAnimalSchema),
    animalsController.createMultiple
  );

animalsRouter
  .route('/add/:type')
  .post(
    requestValidator(CreateAnimalsByTypeSchema),
    animalsController.createByType
  );

animalsRouter
  .route('/:id')
  .get(requestValidator(GetOneSchema), animalsController.getOne)

  .patch(requestValidator(UpdateByIdSchema), animalsController.updateById);
