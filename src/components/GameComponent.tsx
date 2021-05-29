import { ChangeEvent, useState } from 'react';
import './GameComponent.css';
import Grid from './Grid';
import InfoBar from './InfoBar';
import History from './History';
import { newRound, Game, checkNBack, getLastMatchStatus, MatchState, MatchType } from '../Game';
import { useInterval, useKeyPress } from '../util';
import Score from './Score';
import Controls from './Controls';
import Instructions from './Instructions';

const synth = window.speechSynthesis;
const voices = synth?.getVoices();

function say(word: string, voiceIndex: number, volume: number) {
  console.log(`Voice index ${voiceIndex} volume ${volume}`);
  const utterThis = new SpeechSynthesisUtterance(word);
  utterThis.voice = voices[voiceIndex ?? 0];
  utterThis.volume = volume;
  synth.speak(utterThis);
}

export interface GameComponentProps {
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

function GameComponent({game: originalGame}: GameComponentProps) {
  const [game, setGame] = useState(originalGame);
  const [delayOption, setDelayOption] = useState<number|null>(2000);

  const delayOptions = [
    {delay: 3000, label: 'Slow'},
    {delay: 2000, label: 'Medium'},
    {delay: 1500, label: 'Fast'}
  ];

  function onLocationCheckClick() {
    setGame(game => checkNBack(game, MatchType.Location));
  }
  function onSymbolCheckClick() {
    setGame(game => checkNBack(game, MatchType.Location));
  }
  
  function onAudioCheckClick() {
    setGame(game => checkNBack(game, MatchType.Audio));
  }

  useKeyPress(['k', 'K'], onSymbolCheckClick);
  useKeyPress(['L', 'l'], onLocationCheckClick);
  useKeyPress(['J', 'j'], onAudioCheckClick);

  useKeyPress(['p', 'P'], () => {
    setDelayOption(delay => delay ? null : 2000);
  });

  useInterval(() => {
    const newGame = newRound(game);
    setGame(newGame);
    say(newGame.current.symbol.audio, 0, 1);
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
      <InfoBar 
        onLocationClick={onLocationCheckClick}
        onSymbolClick={onSymbolCheckClick}
        onAudioClick={onAudioCheckClick}>
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
      <Controls />
      <h2>Instructions</h2>
      <Instructions />

      <div style={{height: '100px'}}></div>
    </div>
  );
}

export default GameComponent;
