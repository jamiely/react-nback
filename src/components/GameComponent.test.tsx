import { render, screen } from '@testing-library/react';
import GameComponent from './GameComponent';
import { createGame } from '../Game';

test('renders learn react link', () => {
  render(<GameComponent game={createGame()} />);
  const linkElement = screen.getByText(/History/i);
  expect(linkElement).toBeInTheDocument();
});
