import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IAnimalsRepository } from '../repository/animalsRepository';
import { TYPES } from '../../types/types';
import { Animals } from '@prisma/client';
import { BadRequestError } from '../../../errors/badRequestError';
import { PartialAnimalRecordWithoutId } from '../schemas/updateByIdSchema';
import { AnimalInfo } from '../schemas/createSchema';
import { Species } from '../const';
import { AnimalInfoByType } from '../schemas/createByTypeSchema';

export interface IAnimalsService {
  getAll(): Promise<Animals[]>;
  getOne(id: string): Promise<Animals>;
  create(data: AnimalInfo): Promise<string>;
  createMultiple(data: AnimalInfo[]): Promise<number>;
  createByType(species: Species, data: AnimalInfoByType[]): Promise<number>;
  updateById(id: string, data: PartialAnimalRecordWithoutId): Promise<void>;
}

@injectable()
export class AnimalsService implements IAnimalsService {
  constructor(
    @inject(TYPES.IAnimalsRepository)
    private readonly animalsRepository: IAnimalsRepository
  ) {}

  async getAll(): Promise<Animals[]> {
    return this.animalsRepository.getAll();
  }

  async getOne(id: string): Promise<Animals> {
    const animal = await this.animalsRepository.getOne(id);

    if (animal === null) {
      throw new BadRequestError('Invalid animal id');
    }

    return animal;
  }

  async create(data: AnimalInfo): Promise<string> {
    return this.animalsRepository.create(data);
  }

  async createMultiple(data: AnimalInfo[]): Promise<number> {
    return this.animalsRepository.createMany(data);
  }

  async createByType(
    species: Species,
    data: AnimalInfoByType[]
  ): Promise<number> {
    const animals = data.map((animal) => ({
      ...animal,
      species,
    }));

    return await this.createMultiple(animals);
  }

  async updateById(
    id: string,
    data: PartialAnimalRecordWithoutId
  ): Promise<void> {
    await this.animalsRepository.updateById(id, data);
  }
}
