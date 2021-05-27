import { useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import InfoBar from './components/InfoBar';
import History from './components/History';
import { newRound, Game, isMatch } from './Game';
import { useInterval } from './util';

export interface AppProps {
  game: Game
};

function App({game: originalGame}: AppProps) {
  const [game, setGame] = useState(originalGame);
  const [matchState, setMatchState] = useState<string>('');

  function onCheckClick() {
    setMatchState(isMatch(game) ? 'match' : 'nomatch');
  }

  useInterval(() => {
    setGame(game => newRound(game));
  }, 1500);

  useInterval(() => {
    setMatchState('');
  }, 3000);

  return (
    <div className="App">
      <div className="main">
        <Grid symbol={game.current} />
      </div>
      <InfoBar onClick={onCheckClick} />
      <div>{matchState}</div>
      <History game={game} />
    </div>
  );
}

export default App;
