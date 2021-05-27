import { createGame, isMatch, newRound, Game } from './Game';

const r0 = createGame();
const r1 = newRound(r0);
const r2 = newRound(r1);
const manufacturedMatch: Game = {
  ...r2,
  current: {...r0.current}
};
const manufacturedNonMatch: Game = {
  ...r2,
  current: {
    ...r0.current,
    location: {
      row: -1, column: -1
    }
  }
};

test('game structure should match', () => {
  expect(r2.symbols.length).toBe(2);
  expect(r2.roundsBack).toBe(2);
  expect(r2.symbols).toEqual([r1.current, r0.current])
  expect(r1.current).toBe(r2.symbols[0]);
});

test('matching should work', () => {
  expect(isMatch(manufacturedMatch)).toBeTruthy();
  expect(isMatch(manufacturedNonMatch)).toBeFalsy();
});