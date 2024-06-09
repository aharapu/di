import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HomePage } from '@src/pages';

// TODO -> move to mock folder
jest.mock('@src/api/swapi', () => ({
  getPeople: jest.fn(() => Promise.resolve({ results: [] })),
}));

describe('Home Page', () => {
  test('renders a search input', async () => {
    const { getByTestId } = render(<HomePage />);

    await waitFor(() => getByTestId('di-table-container'));

    expect(screen.queryByTestId('di-search-component')).toBeInTheDocument();
  });

  test('renders a table component', async () => {
    const { getByTestId } = render(<HomePage />);

    await waitFor(() => getByTestId('di-table-container'));

    expect(screen.queryByTestId('di-table-component')).toBeInTheDocument();
  });
});
