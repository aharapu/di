import { Box } from '@mui/material';
import { SwapiPeople, getPeople } from '@src/api/swapi';
import { DiTable } from '@src/components';
import { DiSearch } from '@src/components/DiSearch';
import { useEffect, useState } from 'react';

interface TableItem {
  id: string;
  data: Pick<SwapiPeople, 'name' | 'mass'>;
}

export const HomePage: React.FunctionComponent = () => {
  const [tableItems, setTableItems] = useState<TableItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople().then(({ results }) => {
      setTableItems(results.map((r) => ({ id: r.url, data: { name: r.name, mass: r.mass } })));
      setIsLoading(false);
    });

    return () => {
      // TODO -> cancel promise
    };
  }, []);

  return (
    <Box
      sx={{
        padding: '40px',
      }}
    >
      <DiSearch />
      <DiTable
        items={tableItems}
        columns={['name', 'mass']}
        loading={isLoading}
        onClickView={(item) => {
          console.log('item', item);
        }}
      />
    </Box>
  );
};
