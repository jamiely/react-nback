import { Game } from '../Game';
import GameComponent from './GameComponent';

interface AppProps {
    game: Game;
}

function App(props: AppProps) {
    return <GameComponent game={props.game} />
}

export default App;
