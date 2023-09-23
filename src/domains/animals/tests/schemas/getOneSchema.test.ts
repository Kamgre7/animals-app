import { GetOneSchema } from '../../schemas/getOneSchema';

describe('Get one animal schema', () => {
  let params: {
    id: unknown;
  };

  let animal: {
    params: typeof params;
  };

  beforeEach(() => {
    params = {
      id: '61344ab3-b86d-44b6-8b3d-6ea5cc62a290',
    };

    animal = {
      params,
    };
  });

  describe('Get one animal', () => {
    it('Should return true when id is uuid', () => {
      const { success } = GetOneSchema.safeParse(animal);

      expect(success).toBe(true);
    });

    it('Should return false when id is not uuid', () => {
      animal.params.id = 1234;

      const { success } = GetOneSchema.safeParse(animal);

      expect(success).toBe(false);
    });
  });
});
