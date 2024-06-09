import { Typography } from '@mui/material';

interface DiTableProps {
  loading?: boolean;
}

export const DiTable: React.FunctionComponent<DiTableProps> = ({ loading = false }) => {
  if (loading) return <Typography>Loading...</Typography>;

  return <div>DiTable</div>;
};
