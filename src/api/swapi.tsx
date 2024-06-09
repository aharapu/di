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

// TODO -> implement search & pagination
export async function getPeople() {
  const res = await fetch('https://swapi.dev/api/people/');

  return res.json() as Promise<GetPeopleResult>;
}
