import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import InfoBar from './components/InfoBar';
import History from './components/History';
import { newRound, Game, checkNBack, getLastMatchStatus, MatchState } from './Game';
import { useInterval, useKeyPress } from './util';
import Score from './components/Score';

export interface AppProps {
  game: Game
};

function getMatchLabel(game: Game) {
  const lastMatchStatus = getLastMatchStatus(game);
  // only show the match label if it was recent

  if(lastMatchStatus.round < game.round - 1) {
    return <></>;
  }

  const messages: {[key: string]: string} = {};
  messages[MatchState.Match] = `That was a ${game.roundsBack}-back!`;
  messages[MatchState.NoMatch] = "That wasn't a match.";

  return <div>{messages[lastMatchStatus.state]}</div>;
}

function App({game: originalGame}: AppProps) {
  const [game, setGame] = useState(originalGame);
  const [delayOption, setDelayOption] = useState<number|null>(2000);

  const delayOptions = [
    {delay: 3000, label: 'Slow'},
    {delay: 2000, label: 'Medium'},
    {delay: 1500, label: 'Fast'}
  ];

  function onCheckClick() {
    setGame(checkNBack(game));
  }

  useKeyPress('L', () => setGame(checkNBack(game)), [game]);
  useKeyPress('l', () => setGame(checkNBack(game)), [game]);

  useKeyPress('p', () => {
    setDelayOption(delay => delay ? null : 2000);
  }, []);

  useInterval(() => {
    setGame(game => newRound(game));
  }, delayOption);

  function onDelayChange(evt: ChangeEvent<HTMLSelectElement>) {
    let delay = parseInt(evt.target.value);
    if(isNaN(delay)) delay = 2000;
    setDelayOption(delay);
  }

  return (
    <div className="App">
      <Score score={game.score} />
      <div className="round">Round: {game.round}</div>
      <div className="main">
        <Grid symbol={game.current.symbol} />
      </div>
      <InfoBar onClick={onCheckClick}>
        {getMatchLabel(game)}
      </InfoBar>
      <History game={game} />
      <label>Delay 
        <select onChange={onDelayChange}>
          {delayOptions.map(option => 
             <option value={option.delay} 
              key={option.delay}
              selected={option.delay === delayOption}
              >
                {option.label}
              </option>)}
          <option selected={!delayOption}>Paused</option>
        </select>
      </label>
      <h2>Controls</h2>
      <ul>
        <li>p - Pause</li>
        <li>l - Location match</li>
      </ul>
      <div style={{height: '100px'}}></div>
    </div>
  );
}

export default App;
