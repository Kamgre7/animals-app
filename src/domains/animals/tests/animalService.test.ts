import { Sex, Species } from '../const';
import { IAnimalsRepository } from '../repository/animalsRepository';
import { AnimalInfoByType } from '../schemas/createByTypeSchema';
import { AnimalInfo } from '../schemas/createSchema';
import { AnimalsService, IAnimalsService } from '../services/animalsService';

describe('Animal service', () => {
  const id = '61344ab3-b86d-44b6-8b3d-6ea5cc62a290';

  let animalRepositoryMock: IAnimalsRepository;
  let animalsService: IAnimalsService;

  let firstAnimal: AnimalInfo;
  let secondAnimal: AnimalInfo;

  let animalByType: AnimalInfoByType;

  beforeEach(() => {
    firstAnimal = {
      name: 'Dog',
      endangered: false,
      sex: Sex.FEMALE,
      species: Species.MAMMALS,
    };

    secondAnimal = {
      name: 'Dolphin',
      endangered: true,
      sex: Sex.MALE,
      species: Species.MAMMALS,
    };

    animalByType = {
      name: 'Cat',
      endangered: false,
      sex: Sex.FEMALE,
    };

    animalRepositoryMock = {
      create: jest.fn().mockResolvedValue(id),
      createMany: jest.fn().mockResolvedValue(3),
      getAll: jest.fn().mockResolvedValue([]),
      getOne: jest.fn().mockResolvedValue({ ...firstAnimal, id }),
      updateById: jest.fn().mockResolvedValue(undefined),
    };

    animalsService = new AnimalsService(animalRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call getAll method once', async () => {
    await animalsService.getAll();

    expect(animalRepositoryMock.getAll).toBeCalledTimes(1);
  });

  it('Should call getOne method once', async () => {
    await animalsService.getOne(id);

    expect(animalRepositoryMock.getOne).toBeCalledTimes(1);
  });

  it('Should call create method once', async () => {
    await animalsService.create(firstAnimal);

    expect(animalRepositoryMock.create).toBeCalledTimes(1);
  });

  it('Should call createMany method once', async () => {
    await animalsService.createMultiple([firstAnimal, secondAnimal]);

    expect(animalRepositoryMock.createMany).toBeCalledTimes(1);
  });

  it('Should call createMany method once', async () => {
    await animalsService.createByType(Species.MAMMALS, [animalByType]);

    expect(animalRepositoryMock.createMany).toBeCalledTimes(1);
  });

  it('Should call updateById method once, getOne method once', async () => {
    await animalsService.updateById(id, { name: 'John' });

    expect(animalRepositoryMock.getOne).toBeCalledTimes(1);
    expect(animalRepositoryMock.updateById).toBeCalledTimes(1);
  });
});
