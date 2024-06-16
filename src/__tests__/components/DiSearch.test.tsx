import '@testing-library/jest-dom';

import { DiSearch } from '@src/components/DiSearch';
import { fireEvent, render } from '@testing-library/react';

describe('DiSearch component', () => {
  test('should render without crashing', () => {
    render(<DiSearch onSearch={jest.fn()} />);
  });

  test('calls "onSearch" callback function on pressing enter', () => {
    const cb = jest.fn();
    const { getByRole } = render(<DiSearch onSearch={cb} />);

    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();

    fireEvent.keyUp(input, { key: 'Enter' });

    expect(cb).toHaveBeenCalledTimes(1);
  });

  test('calls "onSearch" callback function with input value', () => {
    const searchTerm = 'John Doe';
    const cb = jest.fn();
    const { getByRole } = render(<DiSearch onSearch={cb} />);

    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: searchTerm } });
    fireEvent.keyUp(input, { key: 'Enter' });

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(searchTerm);
  });
});
