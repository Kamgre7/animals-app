import { Sex, Species } from '../../const';
import {
  AnimalInfoSchema,
  CreateAnimalSchema,
} from '../../schemas/createSchema';

type AnimalBody = {
  name: unknown;
  sex: unknown;
  endangered: unknown;
  species: unknown;
};

describe('Create animal schema', () => {
  let body: AnimalBody;

  let animal: {
    body: typeof body;
  };

  beforeEach(() => {
    body = {
      name: 'rex',
      sex: Sex.MALE,
      endangered: false,
      species: Species.MAMMALS,
    };

    animal = {
      body,
    };
  });

  describe('Body schema', () => {
    it('Should return true when name is string, sex is value in Sex enum, endangered is boolean, species is value in Species enum', () => {
      const { success } = AnimalInfoSchema.safeParse(body);

      expect(success).toBe(true);
    });

    it('Should return false when name is not string, or is empty', () => {
      body.name = 111;

      const { success } = AnimalInfoSchema.safeParse(body);

      expect(success).toBe(false);
    });

    it('Should return false when sex value not exist in Sex enum', () => {
      body.sex = 'test';

      const { success } = AnimalInfoSchema.safeParse(body);

      expect(success).toBe(false);
    });

    it('Should return false when species value not exist in Species enum', () => {
      body.species = 'test';

      const { success } = AnimalInfoSchema.safeParse(body);

      expect(success).toBe(false);
    });

    it('Should return false when endangered value is not boolean', () => {
      body.endangered = 'answer';

      const { success } = AnimalInfoSchema.safeParse(body);

      expect(success).toBe(false);
    });
  });

  describe('Create animal', () => {
    it('Should return true when: species value exist in Species enum, name is string, sex is value in Sex enum, endangered is boolean', () => {
      const { success } = CreateAnimalSchema.safeParse(animal);

      expect(success).toBe(true);
    });

    it('Should return false when species value not exist in Species enum', () => {
      animal.body.species = 'test';

      const { success } = CreateAnimalSchema.safeParse(animal);

      expect(success).toBe(false);
    });

    it('Should return false when animal name is not string, ', () => {
      animal.body.name = 1;

      const { success } = CreateAnimalSchema.safeParse(animal);

      expect(success).toBe(false);
    });

    it('Should return false when body animal sex value not exist in Sex enum', () => {
      animal.body.sex = 'test';

      const { success } = CreateAnimalSchema.safeParse(animal);

      expect(success).toBe(false);
    });

    it('Should return false when endangered value is not boolean', () => {
      animal.body.sex = 'answer';

      const { success } = CreateAnimalSchema.safeParse(animal);

      expect(success).toBe(false);
    });
  });
});
