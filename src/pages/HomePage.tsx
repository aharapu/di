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

  const getItems = async (search: string) => {
    setIsLoading(true);
    const { results } = await getPeople({ search });

    const items = results.map((r) => ({ id: r.url, data: { name: r.name, mass: r.mass } }));
    setTableItems(items);
    setIsLoading(false);
  };

  useEffect(() => {
    getItems('');

    return () => {
      // TODO -> cancel active promises
    };
  }, []);

  const handleSearch = (val: string) => {
    getItems(val);
  };

  return (
    <Box
      sx={{
        padding: '40px',
      }}
    >
      <DiSearch onSearch={handleSearch} disabled={isLoading} />
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
