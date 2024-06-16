jest.mock('@src/api/swapi', () => ({
  getPeople: jest.fn(() => Promise.resolve({ results: [] })),
}));
