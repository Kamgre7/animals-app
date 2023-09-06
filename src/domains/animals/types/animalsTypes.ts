export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Species {
  MAMMALS = 'mammals',
  BIRDS = 'birds',
  FISH = 'fish',
  REPTILES = 'reptiles',
}

export type AnimalInfo = {
  name: string;
  sex: Sex;
  species: Species;
  endangered: boolean;
};
