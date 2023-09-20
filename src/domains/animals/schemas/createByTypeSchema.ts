import { z } from 'zod';
import { AnimalRecordSchema, SpeciesEnum } from './utilsAnimalSchemas';

export const AnimalByTypeSchema = AnimalRecordSchema.omit({
  id: true,
  species: true,
});

export const CreateByTypeParamsSchema = z.object({
  type: SpeciesEnum,
});

export const CreateAnimalsByTypeSchema = z.object({
  params: CreateByTypeParamsSchema,
  body: z.object({
    animals: z.array(AnimalByTypeSchema),
  }),
});

export type AnimalInfoByType = z.infer<typeof AnimalByTypeSchema>;
export type CreateAnimalsByTypeReq = z.infer<typeof CreateAnimalsByTypeSchema>;
