import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface DiTableProps {
  loading?: boolean;
  columns: string[];
  items: { id: string; data: { [x: string]: string } }[];
}

export const DiTable: React.FunctionComponent<DiTableProps> = ({ loading = false, items, columns }) => {
  return (
    <Box data-testid="di-table-component" sx={{ paddingTop: '20px' }}>
      {loading && <Typography variant="h4">Loading...</Typography>}
      {!loading && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((col, idx) => (
                  <TableCell key={col} align={idx === 0 ? 'left' : 'right'}>
                    <Typography sx={{ fontWeight: 600 }}>{col}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  {Object.entries(item.data).map(([dataName, dataValue], idx) => {
                    return (
                      <TableCell key={`${item.id}-${dataName}`} align={idx === 0 ? 'left' : 'right'}>
                        {dataValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!loading && items.length === 0 && <Typography variant="h4">No items to display</Typography>}
    </Box>
  );
};
