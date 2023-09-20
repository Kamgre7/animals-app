import { z } from 'zod';
import { AnimalRecordSchema } from './utilsAnimalSchemas';

export const AnimalInfoSchema = AnimalRecordSchema.omit({
  id: true,
});

export const CreateAnimalSchema = z.object({
  body: AnimalInfoSchema,
});

export const CreateMultipleAnimalSchema = z.object({
  body: z.object({
    animals: z.array(AnimalInfoSchema),
  }),
});

export type AnimalInfo = z.infer<typeof AnimalInfoSchema>;
export type CreateAnimalReq = z.infer<typeof CreateAnimalSchema>;

export type CreateMultipleAnimalReq = z.infer<
  typeof CreateMultipleAnimalSchema
>;
