import { DiTable } from '@src/components';
import { DiSearch } from '@src/components/DiSearch';

export const HomePage: React.FunctionComponent = () => {
  return (
    <div>
      <DiSearch />
      <DiTable />
    </div>
  );
};
