import { Box } from '@mui/material';
import { SwapiPeople, getPeople } from '@src/api/swapi';
import { DiTable } from '@src/components';
import { DiSearch } from '@src/components/DiSearch';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TableItem {
  id: string;
  data: Pick<SwapiPeople, 'name' | 'mass'>;
}

interface Query {
  search: string;
  page: string;
}

export const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [tableItems, setTableItems] = useState<TableItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState({ search: '', page: '' });

  const getItems = async (query: Query) => {
    setIsLoading(true);
    const { results, count } = await getPeople(query);

    const items = results.map((r) => ({ id: r.url, data: { name: r.name, mass: r.mass } }));
    setTableItems(items);
    setItemCount(count);
    setIsLoading(false);
  };

  useEffect(() => {
    getItems(query);

    return () => {
      // TODO -> cancel active promises
    };
  }, [query]);

  const handleSearch = (search: string) => {
    setQuery((prev) => ({ ...prev, search }));
  };

  return (
    <Box
      sx={{
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <DiSearch onSearch={handleSearch} disabled={isLoading} />
      <DiTable
        items={tableItems}
        columns={['name', 'mass']}
        loading={isLoading}
        onClickView={(item) => {
          navigate('/character/' + item.id.split('/')[5]);
        }}
        itemCount={itemCount}
        onPageChange={(newPage) => {
          setQuery((prev) => ({ ...prev, page: newPage.toString() }));
        }}
      />
    </Box>
  );
};
