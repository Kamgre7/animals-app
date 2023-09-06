import { z } from 'zod';

export const GetOneParamsSchema = z.object({
  id: z.string().uuid(),
});

export const GetOneSchema = z.object({
  params: GetOneParamsSchema,
});

export type GetOneAnimalReq = z.infer<typeof GetOneSchema>;
