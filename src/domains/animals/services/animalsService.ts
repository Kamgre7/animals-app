import 'reflect-metadata';
import { Animals } from '@prisma/client';
import { IAnimalsRepository } from '../repository/animalsRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types/types';

export interface IAnimalsService {
  getAll(): Promise<string>;
  getOne(id: string): Promise<Animals>;
  updateByContext(id: string, data: Partial<Animals>): Promise<void>;
}

@injectable()
export class AnimalsService implements IAnimalsService {
  constructor(
    @inject(TYPES.IAnimalsRepository)
    private readonly animalsRepository: IAnimalsRepository
  ) {}

  async getAll(): Promise<string> {
    console.log('test');
    return '123';
    // return this.animalsRepository.getAll();
  }

  async getOne(id: string): Promise<Animals> {
    const animal = await this.animalsRepository.getOne(id);

    if (!animal) {
      throw new Error('Animal not found');
    }

    return animal;
  }

  async updateByContext(id: string, data: Partial<Animals>): Promise<void> {
    await this.animalsRepository.updateByContext(id, data);
  }
}
