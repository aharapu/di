import { Search } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';

interface DiSearchProps {
  onSearch: (val: string) => void;
  disabled?: boolean;
}

export const DiSearch: React.FunctionComponent<DiSearchProps> = ({ onSearch: triggerOnSearch, disabled = false }) => {
  const [search, setSearch] = useState('');

  return (
    <TextField
      placeholder="Search by character name"
      InputProps={{
        endAdornment: (
          <IconButton onClick={() => triggerOnSearch(search)} disabled={disabled}>
            <Search />
          </IconButton>
        ),
      }}
      inputProps={{
        'data-testid': 'di-search-component',
      }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyUp={(e) => {
        e.preventDefault();
        e.key === 'Enter' && triggerOnSearch(search);
      }}
      disabled={disabled}
    />
  );
};
