import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DiTable } from '@src/components';

describe('DiTable component', () => {
  test('Does NOT show loading message by default', async () => {
    render(<DiTable />);

    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });

  test('Shows loading when "loading" prop is true', async () => {
    render(<DiTable loading />);

    expect(screen.queryByText('loading')).not.toBeInTheDocument();
  });
});
