import { Route, Router, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { Game } from '../Game';
import GameComponent from './GameComponent';
import Home from './Home';
import { createBrowserHistory } from 'history';

interface AppProps {
    game: Game;
}

const history = createBrowserHistory();

function App({game}: AppProps) {    
    return <Router history={history}>
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
    </Router>;
}

export default App;
