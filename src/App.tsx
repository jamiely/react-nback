import { ChangeEvent, useState } from 'react';
import './App.css';
import Grid from './components/Grid';
import InfoBar from './components/InfoBar';
import History from './components/History';
import { newRound, Game, isMatch } from './Game';
import { useInterval } from './util';
import Score from './components/Score';

export interface AppProps {
  game: Game
};

enum MatchState {
  None = "",
  Match = "Match",
  NoMatch = "NoMatch",
};

interface MatchStatus {
  round: number;
  state: MatchState;
}

function App({game: originalGame}: AppProps) {
  const [game, setGame] = useState(originalGame);
  const [matchState, setMatchState] = useState<MatchStatus>({round: 0, state: MatchState.None});
  const [score, setScore] = useState(0);
  const [delayOption, setDelayOption] = useState(2000);

  const delayOptions = [
    {delay: 3000, label: 'Slow'},
    {delay: 2000, label: 'Medium'},
    {delay: 1500, label: 'Fast'}
  ];

  function onCheckClick() {
    // we already clicked this round
    if(matchState.round === game.round) return;

    if(! isMatch(game)) {
      setMatchState({round: game.round, state: MatchState.NoMatch});
      return;
    }

    setMatchState({round: game.round, state: MatchState.Match});
    setScore(score => score + 1);
  }

  useInterval(() => {
    setGame(game => newRound(game));
  }, delayOption);

  useInterval(() => {
    setMatchState({round: game.round, state: MatchState.None});
  }, delayOption * 2);

  function onDelayChange(evt: ChangeEvent<HTMLSelectElement>) {
    let delay = parseInt(evt.target.value);
    if(isNaN(delay)) delay = 2000;
    setDelayOption(delay);
  }

  return (
    <div className="App">
      <Score score={score} />
      <div className="round">Round: {game.round}</div>
      <div className="main">
        <Grid symbol={game.current} />
      </div>
      <InfoBar onClick={onCheckClick} />
      <div>{matchState.state}</div>
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
        </select>
      </label>
    </div>
  );
}

export default App;
