import React from 'react';
import { Paper, Skeleton, Typography } from '@mui/material';

interface DiInfoCardProps {
  loading?: boolean;
  title?: string;
  data: { [x: string]: string | null | undefined };
}

export const DiInfoCard: React.FunctionComponent<DiInfoCardProps> = ({ loading = false, data, title }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        marginTop: '20px',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: '8px',
      }}
    >
      {loading ? (
        <>
          <Skeleton
            variant="rectangular"
            height={30}
            width={150 + Math.random() * 100}
            sx={{ gridColumn: '1 / 3', marginBottom: '8px', marginLeft: 'auto', marginRight: 'auto' }}
          />
          {new Array(6).fill(null).map((_, idx) => {
            return (
              <React.Fragment key={idx}>
                <Skeleton
                  variant="rectangular"
                  height={20}
                  width={150 + Math.random() * 100 * (Math.random() > 0.5 ? -1 : 1)}
                  sx={{ marginLeft: idx % 2 ? null : 'auto', marginBottom: '4px' }}
                />
              </React.Fragment>
            );
          })}
        </>
      ) : (
        <>
          {!!title && (
            <Typography variant="h5" align="center" sx={{ gridColumn: '1 / 3', marginBottom: '8px' }}>
              {title}
            </Typography>
          )}
          {Object.entries(data).map((a) => {
            const [left, right] = a;
            return (
              <React.Fragment key={left}>
                <Typography variant="h6" align="right">
                  {left}:
                </Typography>
                <Typography variant="h6">{right}</Typography>
              </React.Fragment>
            );
          })}
        </>
      )}
    </Paper>
  );
};
