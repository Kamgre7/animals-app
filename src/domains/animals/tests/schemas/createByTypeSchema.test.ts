import { Sex, Species } from '../../const';
import {
  AnimalByTypeSchema,
  CreateAnimalsByTypeSchema,
  CreateByTypeParamsSchema,
} from '../../schemas/createByTypeSchema';

type AnimalBody = {
  name: unknown;
  sex: unknown;
  endangered: unknown;
};

type AnimalParam = {
  type: unknown;
};

describe('Create by type schema', () => {
  let body: AnimalBody;
  let params: AnimalParam;

  let animal: {
    body: {
      animals: [typeof body];
    };
    params: typeof params;
  };

  beforeEach(() => {
    body = {
      name: 'rex',
      sex: Sex.MALE,
      endangered: false,
    };

    params = {
      type: Species.MAMMALS,
    };

    animal = {
      body: {
        animals: [body],
      },
      params,
    };
  });

  describe('Param schema', () => {
    it('Should return true when species value exist in Species enum', () => {
      const { success } = CreateByTypeParamsSchema.safeParse(params);

      expect(success).toBe(true);
    });

    it('Should return false when species value not exist in Species enum', () => {
      params.type = 'dinosaur';

      const { success } = CreateByTypeParamsSchema.safeParse(params);

      expect(success).toBe(false);
    });
  });

  describe('Body schema', () => {
    it('Should return true when name is string, sex is value in Sex enum, endangered is boolean', () => {
      const { success } = AnimalByTypeSchema.safeParse(body);

      expect(success).toBe(true);
    });

    it('Should return false when name is not string, or is empty', () => {
      body.name = 111;

      const { success } = AnimalByTypeSchema.safeParse(body);

      expect(success).toBe(false);
    });

    it('Should return false when sex value not exist in Sex enum', () => {
      body.sex = 'test';

      const { success } = AnimalByTypeSchema.safeParse(body);

      expect(success).toBe(false);
    });

    it('Should return false when endangered value not boolean', () => {
      body.endangered = 'answer';

      const { success } = AnimalByTypeSchema.safeParse(body);

      expect(success).toBe(false);
    });
  });

  describe('Create animals by type schema', () => {
    it('Should return true when: species value exist in Species enum, name is string, sex is value in Sex enum, endangered is boolean', () => {
      const { success } = CreateAnimalsByTypeSchema.safeParse(animal);

      expect(success).toBe(true);
    });

    it('Should return false when species value not exist in Species enum', () => {
      animal.params.type = 'dinosaur';

      const { success } = CreateAnimalsByTypeSchema.safeParse(animal);

      expect(success).toBe(false);
    });

    it('Should return false when body animal name is not string, ', () => {
      animal.body.animals[0].name = 1;

      const { success } = CreateAnimalsByTypeSchema.safeParse(animal);

      expect(success).toBe(false);
    });

    it('Should return false when body animal sex value not exist in Sex enum', () => {
      animal.body.animals[0].sex = 'test';

      const { success } = CreateAnimalsByTypeSchema.safeParse(animal);

      expect(success).toBe(false);
    });

    it('Should return false when body animal endangered value is not boolean', () => {
      animal.body.animals[0].endangered = 'answer';

      const { success } = CreateAnimalsByTypeSchema.safeParse(animal);

      expect(success).toBe(false);
    });
  });
});
