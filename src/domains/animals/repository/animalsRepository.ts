import 'reflect-metadata';
import { Animals } from '@prisma/client';
import { prisma } from '../../../db/db';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { AnimalInfo } from '../types/animalsTypes';

export interface IAnimalsRepository {
  create(data: AnimalInfo): Promise<string>;
  //  createMany(data: Partial<Animals>[]): Promise<string[]>;
  getAll(): Promise<Animals[]>;
  getOne(id: string): Promise<Animals | null>;
  updateByContext(id: string, data: Partial<Animals>): Promise<void>;
}

@injectable()
export class AnimalsRepository implements IAnimalsRepository {
  constructor(private readonly animals = prisma.animals) {}

  async create(data: AnimalInfo): Promise<string> {
    /*     const animal = await this.animals.create({
      data: {
        endangered: data.endangered,
        name: data.name,
        sex: data.sex,
        species: data.species,
      },
    });
 */
    return '1';
  }

  async getAll(): Promise<Animals[]> {
    return this.animals.findMany();
  }

  async getOne(id: string): Promise<Animals | null> {
    return this.animals.findUnique({
      where: { id },
    });
  }

  async updateByContext(id: string, data: Partial<Animals>): Promise<void> {
    await this.animals.update({
      where: { id },
      data,
    });
  }
}

//export const animalsRepository = new AnimalsRepository();
