import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Paper, Typography } from '@mui/material';

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

  if (!charData) return <Typography variant="h3">Loading...</Typography>;

  // TODO -> ADD: the home world info, what neighbors they had, what spaceships they few on...

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
      <Paper sx={{ marginTop: '20px', padding: '20px' }} elevation={5}>
        <Typography variant="h5">Name: {charData.name}</Typography>
        <Typography variant="h6">Height: {charData.height}</Typography>
        <Typography variant="h6">Mass: {charData.mass}</Typography>
        <Typography variant="h6">Hair Color: {charData.hair_color}</Typography>
        <Typography variant="h6">Skin Color: {charData.skin_color}</Typography>
        <Typography variant="h6">Eye Color: {charData.eye_color}</Typography>
        <Typography variant="h6">Birth Year: {charData.birth_year}</Typography>
        <Typography variant="h6">Gender: {charData.gender}</Typography>
      </Paper>
      <DiInfoCard
        loading={!homeworldData}
        title={`Homeworld ${homeworldData?.name}`}
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
