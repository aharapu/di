import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import { SwapiPeople, getPeopleById } from '@src/api/swapi';

import { SwapiHomeworld } from './types';
import { DiInfoCard } from '@src/components/DiInfoCard';

export const CharacterDetails: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [charData, setCharData] = useState<SwapiPeople | null>(null);
  const [homeworldData, setHomeworldData] = useState<SwapiHomeworld | null>(null);

  const getHomeworldData = async (url: string) => {
    const hw = (await fetch(url).then((r) => r.json())) as SwapiHomeworld;

    setHomeworldData(hw);
  };

  const getStarshipData = async (urls: string[]) => {
    if (urls.length === 0) return;
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
    </Box>
  );
};
