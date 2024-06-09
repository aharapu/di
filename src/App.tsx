import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";

export function App() {
  return (
    <TextField
      placeholder="Search by character name"
      InputProps={{
        endAdornment: <Search />,
      }}
    />
  );
}
