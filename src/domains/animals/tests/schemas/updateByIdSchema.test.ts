import { Sex, Species } from '../../const';
import {
  UpdateByIdBodySchema,
  UpdateByIdSchema,
} from '../../schemas/updateByIdSchema';

type AnimalBody = {
  name: unknown;
  sex: unknown;
  endangered: unknown;
  species: unknown;
};

describe('Update by id schema', () => {
  let body: Partial<AnimalBody>;
  let params: {
    id: unknown;
  };

  let animal: {
    params: typeof params;
    body: typeof body;
  };

  beforeEach(() => {
    params = {
      id: '61344ab3-b86d-44b6-8b3d-6ea5cc62a290',
    };

    body = {
      name: 'rex',
      sex: Sex.MALE,
      endangered: false,
      species: Species.MAMMALS,
    };

    animal = {
      params,
      body,
    };
  });

  describe('Body schema', () => {
    it('Should return true when name is string, sex is value in Sex enum, endangered is boolean, species is value in Species enum', () => {
      const { success } = UpdateByIdBodySchema.safeParse(body);

      expect(success).toBe(true);
    });

    it('Should return false when name is not string, or is empty', () => {
      body.name = 111;

      const { success } = UpdateByIdBodySchema.safeParse(body);

      expect(success).toBe(false);
    });

    it('Should return false when sex value not exist in Sex enum', () => {
      body.sex = 'test';

      const { success } = UpdateByIdBodySchema.safeParse(body);

      expect(success).toBe(false);
    });

    it('Should return false when species value not exist in Species enum', () => {
      body.species = 'test';

      const { success } = UpdateByIdBodySchema.safeParse(body);

      expect(success).toBe(false);
    });

    it('Should return false when endangered value is not boolean', () => {
      body.endangered = 'answer';

      const { success } = UpdateByIdBodySchema.safeParse(body);

      expect(success).toBe(false);
    });
  });

  describe('Update by id schema', () => {
    it('Should return true when id is uuid', () => {
      const { success } = UpdateByIdSchema.safeParse(animal);

      expect(success).toBe(true);
    });

    it('Should return false when id is not uuid', () => {
      animal.params.id = 1234;

      const { success } = UpdateByIdSchema.safeParse(animal);

      expect(success).toBe(false);
    });
  });
});
