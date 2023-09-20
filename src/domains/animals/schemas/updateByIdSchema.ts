import { z } from 'zod';
import { AnimalRecordSchema } from './utilsAnimalSchemas';

export const UpdateByIdBodySchema = AnimalRecordSchema.omit({
  id: true,
}).partial();

export const UpdateByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: UpdateByIdBodySchema,
});

export type PartialAnimalRecordWithoutId = z.infer<typeof UpdateByIdBodySchema>;
export type UpdateByIdAnimalReq = z.infer<typeof UpdateByIdSchema>;
