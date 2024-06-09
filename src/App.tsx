import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";

function App() {
  return (
    <TextField
      placeholder="Search by character name"
      InputProps={{
        endAdornment: <Search />,
      }}
    />
  );
}

export default App;
