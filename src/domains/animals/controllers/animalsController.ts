import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { IAnimalsService } from '../services/animalsService';
import { Request, Response } from 'express';
import { TYPES } from '../../types/types';
import { ParsedRequest } from '../../../apiTypes';
import { GetOneAnimalReq } from '../schemas/getOneSchema';

export interface IAnimalsController {
  getAll(req: Request, res: Response): Promise<void>;
  getOne(req: Request, res: Response): Promise<void>;
  updateByContext(req: Request, res: Response): Promise<void>;
}

@injectable()
export class AnimalsController implements IAnimalsController {
  constructor(
    @inject(TYPES.IAnimalsService)
    private readonly animalsService: IAnimalsService
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    console.log('ADSADSAD');

    console.log(this.animalsService);
    // const animals = await this.animalsService.getAll();
    // console.log(animals);
    res.status(200).json('animals');
  }

  async getOne(
    req: ParsedRequest<GetOneAnimalReq>,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const animal = await this.animalsService.getOne(id);

    res.status(200).json(animal);
  }

  async updateByContext(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const data = req.body;

    await this.animalsService.updateByContext(id, data);
    res.status(200).send();
  }
}
