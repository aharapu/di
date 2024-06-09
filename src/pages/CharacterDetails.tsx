import { Box, Button, Paper, Typography } from '@mui/material';
import { SwapiPeople, getPeopleById } from '@src/api/swapi';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const CharacterDetails: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [charData, setCharData] = useState<SwapiPeople | null>(null);

  const getCharData = async (id: number) => {
    const data = await getPeopleById(id);

    setCharData(data);
  };

  useEffect(() => {
    getCharData(parseInt(params.id ?? ''));
  }, [params.id]);

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
    </Box>
  );
};
