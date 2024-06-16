import { useState } from 'react';
import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface DiTableItem {
  id: string;
  data: { [x: string]: string };
}

interface DiTableProps {
  loading?: boolean;
  columns: string[];
  items: DiTableItem[];
  onClickView?: (item: DiTableItem) => void;
  itemCount: number;
  onPageChange?: (page: number) => void;
}

export const DiTable: React.FunctionComponent<DiTableProps> = ({
  loading = false,
  items,
  columns,
  onClickView,
  itemCount,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Box
      data-testid="di-table-component"
      sx={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {loading && <Typography variant="h4">Loading...</Typography>}
      {!loading && (
        <TableContainer
          component={Paper}
          data-testid="di-table-container"
          sx={{ width: '600px', alignSelf: 'stretch' }}
          elevation={5}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((col, idx) => (
                  <TableCell key={col} align={idx === 0 ? 'left' : 'right'}>
                    <Typography sx={{ fontWeight: 600 }}>{col}</Typography>
                  </TableCell>
                ))}
                <TableCell />
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
                  <TableCell align="right">
                    <Button variant="outlined" onClick={() => onClickView && onClickView(item)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Pagination
              count={Math.ceil(itemCount / 10)}
              page={currentPage}
              onChange={(...args) => {
                const page = args[1];
                setCurrentPage(page);
                onPageChange && onPageChange(page);
              }}
            />
          </Box>
        </TableContainer>
      )}
      {!loading && items.length === 0 && <Typography variant="h4">No items to display</Typography>}
    </Box>
  );
};
