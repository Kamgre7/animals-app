import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IAnimalsService } from '../services/animalsService';
import { Request, Response } from 'express';
import { TYPES } from '../../types/types';
import { ParsedRequest } from '../../../apiTypes';
import { GetOneAnimalReq } from '../schemas/getOneSchema';
import { UpdateByIdAnimalReq } from '../schemas/updateByIdSchema';
import {
  CreateAnimalReq,
  CreateMultipleAnimalReq,
} from '../schemas/createSchema';
import { CreateAnimalsByTypeReq } from '../schemas/createByTypeSchema';

export interface IAnimalsController {
  create(req: ParsedRequest<CreateAnimalReq>, res: Response): Promise<void>;
  createMultiple(
    req: ParsedRequest<CreateMultipleAnimalReq>,
    res: Response
  ): Promise<void>;
  createByType(
    req: ParsedRequest<CreateAnimalsByTypeReq>,
    res: Response
  ): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
  getOne(req: ParsedRequest<GetOneAnimalReq>, res: Response): Promise<void>;
  updateById(
    req: ParsedRequest<UpdateByIdAnimalReq>,
    res: Response
  ): Promise<void>;
}

@injectable()
export class AnimalsController implements IAnimalsController {
  constructor(
    @inject(TYPES.IAnimalsService)
    private readonly animalsService: IAnimalsService
  ) {}

  async create(
    req: ParsedRequest<CreateAnimalReq>,
    res: Response
  ): Promise<void> {
    const data = req.body;
    const animalId = await this.animalsService.create(data);

    res.status(201).json(animalId);
  }

  async createMultiple(
    req: ParsedRequest<CreateMultipleAnimalReq>,
    res: Response
  ): Promise<void> {
    const { animals } = req.body;
    const createdAnimalsCounter = await this.animalsService.createMultiple(
      animals
    );

    res.status(201).json({
      createdAnimals: createdAnimalsCounter,
    });
  }

  async createByType(
    req: ParsedRequest<CreateAnimalsByTypeReq>,
    res: Response
  ): Promise<void> {
    const { animals } = req.body;
    const { type } = req.params;

    const createdAnimalsCounter = await this.animalsService.createByType(
      type,
      animals
    );

    res.status(201).json({
      createdAnimals: createdAnimalsCounter,
    });
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const animals = await this.animalsService.getAll();

    res.status(200).json(animals);
  }

  async getOne(
    req: ParsedRequest<GetOneAnimalReq>,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const animal = await this.animalsService.getOne(id);

    res.status(200).json(animal);
  }

  async updateById(
    req: ParsedRequest<UpdateByIdAnimalReq>,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const data = req.body;

    await this.animalsService.updateById(id, data);

    res.status(204).end();
  }
}
