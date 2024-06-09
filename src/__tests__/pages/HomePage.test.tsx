import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HomePage } from '@src/pages';

// TODO -> move to mock folder
jest.mock('@src/api/swapi', () => ({
  getPeople: jest.fn(() => Promise.resolve([])),
}));

describe('Home Page', () => {
  test('renders a search input', () => {
    render(<HomePage />);

    expect(screen.queryByTestId('di-search-component')).toBeInTheDocument();
  });

  test('renders a table component', () => {
    render(<HomePage />);

    expect(screen.queryByTestId('di-table-component')).toBeInTheDocument();
  });
});
