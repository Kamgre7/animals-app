import { z } from 'zod';
import { Sex, Species } from '../const';

export const SexEnum = z.nativeEnum(Sex);
export const SpeciesEnum = z.nativeEnum(Species);

export const AnimalRecordSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nonempty(),
  sex: SexEnum,
  species: SpeciesEnum,
  endangered: z.boolean(),
});

export type AnimalRecord = z.infer<typeof AnimalRecordSchema>;
