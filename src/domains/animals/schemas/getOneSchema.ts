import { z } from 'zod';

export const GetOneSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type GetOneAnimalReq = z.infer<typeof GetOneSchema>;
