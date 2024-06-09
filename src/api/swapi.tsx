export interface SwapiPeople {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface GetPeopleResult {
  count: number;
  next: string;
  previous: string;
  results: SwapiPeople[];
}

const BASE_URL = 'https://swapi.dev/api/people/';

export async function getPeople(cfg: { search?: string; page?: string } = {}) {
  let url = BASE_URL;

  const search = new URLSearchParams(cfg).toString();

  if (search) url += `?${search}`;

  const res = await fetch(url);

  return res.json() as Promise<GetPeopleResult>;
}
