import { Search } from '@mui/icons-material';
import { TextField } from '@mui/material';

export const DiSearch: React.FunctionComponent = () => (
  <TextField
    placeholder="Search by character name"
    InputProps={{
      endAdornment: <Search />,
    }}
    inputProps={{
      'data-testid': 'di-search-component',
    }}
  />
);
