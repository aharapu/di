import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import { SwapiPeople, getPeopleById } from '@src/api/swapi';

import { SwapiHomeworld, SwapiStarship } from './types';
import { DiInfoCard } from '@src/components/DiInfoCard';

export const CharacterDetails: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [charData, setCharData] = useState<SwapiPeople | null>(null);
  const [homeworldData, setHomeworldData] = useState<SwapiHomeworld | null>(null);
  const [starshipsData, setStarshipsData] = useState<SwapiStarship[]>([]);

  const getHomeworldData = async (url: string) => {
    const hw = (await fetch(url).then((r) => r.json())) as SwapiHomeworld;

    setHomeworldData(hw);
  };

  const getStarshipData = async (urls: string[]) => {
    if (urls.length === 0) return;

    const starships = (await Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))) as SwapiStarship[];
    setStarshipsData(starships);
  };

  const getCharData = useCallback(async (id: number) => {
    const data = await getPeopleById(id);
    setCharData(data);

    getHomeworldData(data.homeworld);
    getStarshipData(data.starships);
  }, []);

  useEffect(() => {
    getCharData(parseInt(params.id ?? ''));
  }, [params.id, getCharData]);

  return (
    <Box sx={{ padding: '40px' }}>
      <Button
        variant="outlined"
        onClick={() => {
          navigate('/');
        }}
      >
        Back to character list
      </Button>

      <DiInfoCard
        loading={!charData}
        title={charData?.name}
        data={{
          Height: charData?.height,
          Mass: charData?.mass,
          'Hair Color': charData?.hair_color,
          'Skin Color': charData?.skin_color,
          'Eye Color': charData?.eye_color,
          'Birth Year': charData?.birth_year,
          Gender: charData?.gender,
        }}
      />
      <DiInfoCard
        loading={!homeworldData}
        title={`From the homeworld planet of ${homeworldData?.name}`}
        data={{
          'Rotational Period': homeworldData?.rotation_period,
          'Orbital Period': homeworldData?.orbital_period,
          Diameter: homeworldData?.diameter,
          Climate: homeworldData?.climate,
          Gravity: homeworldData?.gravity,
          Terrain: homeworldData?.terrain,
          'Surface Water': homeworldData?.surface_water,
          Population: homeworldData?.population,
        }}
      />
      {!!charData?.starships.length &&
        charData.starships.length > 0 &&
        charData.starships.map((_, idx) => {
          const ship = starshipsData[idx];

          return (
            <DiInfoCard
              loading={!ship}
              key={ship?.name ?? Math.random()}
              title={ship?.name}
              data={{
                Model: ship?.model,
                Manufacturer: ship?.manufacturer,
                'Cost In Credits': ship?.cost_in_credits,
                Length: ship?.length,
                'Max Atmosphering Speed': ship?.max_atmosphering_speed,
                Crew: ship?.crew,
                Passengers: ship?.passengers,
                'Cargo Capacity': ship?.cargo_capacity,
                Consumables: ship?.consumables,
                'Hyperdrive Rating': ship?.hyperdrive_rating,
                MGLT: ship?.MGLT,
                'Starship Class': ship?.starship_class,
              }}
            />
          );
        })}
    </Box>
  );
};
