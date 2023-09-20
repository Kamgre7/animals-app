import 'reflect-metadata';
import { Animals } from '@prisma/client';
import { prisma } from '../../../db/db';
import { injectable } from 'inversify';
import { PartialAnimalRecordWithoutId } from '../schemas/updateByIdSchema';
import { AnimalInfo } from '../schemas/createSchema';
import { BadRequestError } from '../../../errors/badRequestError';

export interface IAnimalsRepository {
  create(data: AnimalInfo): Promise<string>;
  createMany(data: AnimalInfo[]): Promise<number>;
  getAll(): Promise<Animals[]>;
  getOne(id: string): Promise<Animals | null>;
  updateById(id: string, data: PartialAnimalRecordWithoutId): Promise<void>;
}

@injectable()
export class AnimalsRepository implements IAnimalsRepository {
  constructor(private readonly animals = prisma.animals) {}

  async create(data: AnimalInfo): Promise<string> {
    const existingAnimal = await this.removeDuplicatedAnimals([data]);

    if (existingAnimal.length === 0) {
      throw new BadRequestError('Animal already exists');
    }

    const animal = await this.animals.create({
      data,
    });

    return animal.id;
  }

  async createMany(data: AnimalInfo[]): Promise<number> {
    const animals = await this.removeDuplicatedAnimals(data);

    const { count } = await this.animals.createMany({
      data: animals,
      skipDuplicates: true,
    });

    return count;
  }

  async getAll(): Promise<Animals[]> {
    return this.animals.findMany();
  }

  async getOne(id: string): Promise<Animals | null> {
    return this.animals.findUnique({
      where: { id },
    });
  }

  async updateById(
    id: string,
    data: PartialAnimalRecordWithoutId
  ): Promise<void> {
    await this.animals.update({
      where: { id },
      data,
    });
  }

  private async removeDuplicatedAnimals(
    data: AnimalInfo[]
  ): Promise<AnimalInfo[]> {
    const duplicate = await this.findDuplicatedAnimals(data);

    return duplicate.filter((value) => value === null) as AnimalInfo[];
  }

  private async findDuplicatedAnimals(
    data: AnimalInfo[]
  ): Promise<(AnimalInfo | null)[]> {
    return await Promise.all(
      data.map(async (animal) => {
        const duplicate = await this.animals.findFirst({
          where: {
            name: animal.name,
            sex: animal.sex,
            species: animal.species,
          },
        });

        return duplicate ? null : animal;
      })
    );
  }
}
