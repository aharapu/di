import React from 'react';
import { Paper, Typography } from '@mui/material';

interface DiInfoCardProps {
  loading?: boolean;
  title?: string;
  data: { [x: string]: string | null | undefined };
}

export const DiInfoCard: React.FunctionComponent<DiInfoCardProps> = ({ loading = false, data, title }) => {
  // TODO -> replace with skeleton
  if (loading) return 'Loading...';

  return (
    <Paper elevation={5}>
      {!!title && <Typography>{title}</Typography>}
      {Object.entries(data).map((a) => {
        const [left, right] = a;
        return (
          <React.Fragment key={left}>
            <Typography>{left}</Typography>
            <Typography>{right}</Typography>
          </React.Fragment>
        );
      })}
    </Paper>
  );
};
