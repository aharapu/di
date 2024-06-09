import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HomePage } from '@src/pages';

describe('Home Page', () => {
  test('renders a search input', async () => {
    render(<HomePage />);

    const input = await screen.findByPlaceholderText('Search by character name');

    expect(input).toBeDefined();
  });
});
