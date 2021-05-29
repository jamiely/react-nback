import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { createGame } from './Game';

test('renders learn react link', () => {
  render(<App game={createGame()} />);
  const linkElement = screen.getByText(/History/i);
  expect(linkElement).toBeInTheDocument();
});
