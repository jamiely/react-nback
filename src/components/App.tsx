import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { Game } from '../Game';
import GameComponent from './GameComponent';
import Home from './Home';

interface AppProps {
    game: Game;
}

function App({game}: AppProps) {    
    return <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASENAME}>
        <h1>Triple {game.roundsBack}-back</h1>
        <Link to="/">Home</Link> | <Link to="/game">Play</Link>
        <Switch>
            <Route path="/game">
                <GameComponent game={game} />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    </BrowserRouter>;
}

export default App;
