
const availableCellTexts = ['💩', '🍉', '🔥', '😅', '🐒', '🌈', '🍏', '⚽'];

export enum MatchState {
    None = "",
    Match = "Match",
    NoMatch = "NoMatch",
};

interface MatchStatus {
    round: number;
    state: MatchState;
};

export enum MatchType {
    Symbol = "symbol",
    Location = "location",
};

export const initialMatchStatus: MatchStatus = {round: 0, state: MatchState.None};

export interface HistoryItem {
    symbol: Symbol;
    matchState: MatchState;
};

export interface Game {
    round: number;
    // past symbols
    history: HistoryItem[];
    // current symbols
    current: HistoryItem;
    // n-back
    roundsBack: number;
    matchHistory: MatchStatus[];
    score: number;
}

export function getSymbols(game: Game): Symbol[] {
    return game.history.map(h => h.symbol);
}

export function getLastMatchStatus({matchHistory}: Game): MatchStatus {
    if(matchHistory.length == 0) return initialMatchStatus;

    return matchHistory[matchHistory.length - 1];
}

export interface Position {
    row: number;
    column: number;
}

export interface Symbol {
    text: string;
    location: Position;
}

export function getNext(): Symbol {
    return {text: getRandomCellText(), location: {row: 0, column: 0}};
}

export function getIndexFromPosition(position: Position) {
    return position.row * 3 + position.column;
}

// returns true if n-back is true at this point
export function isMatch(game: Game, matchType: MatchType) {
    if(matchType == MatchType.Location) return isLocationMatch(game);
    if(matchType == MatchType.Symbol) return isSymbolMatch(game);

    console.error(`Unrecognized match type ${matchType}`);
    return false;
}

function isSymbolMatch({roundsBack, history, current}: Game) {
    if(roundsBack-1 >= history.length) return false;
    const symbolNRoundsBack = history[roundsBack - 1].symbol;
    const currentText = current.symbol.text;
    return symbolNRoundsBack.text === currentText;
}

function isLocationMatch({roundsBack, history, current}: Game) {
    if(roundsBack-1 >= history.length) return false;
    const symbolNRoundsBack = history[roundsBack - 1].symbol;
    const currentLocation = current.symbol.location;
    return symbolNRoundsBack.location.row === currentLocation.row &&
        symbolNRoundsBack.location.column === currentLocation.column;
}

export function createGame(): Game {
    return {
        round: 1,
        current: {
            matchState: MatchState.None,
            symbol: {text: getRandomCellText(), location: {row: 0, column: 0}}
        },
        history: [],
        roundsBack: 2, // defaults to 2 back
        matchHistory: [],
        score: 0,
    };
}

export function checkNBack(game: Game, matchType: MatchType): Game {
    // we already tried a match
    if(game.current.matchState !== MatchState.None) return game;

    let matchStatus = {round: game.round, state: MatchState.None};
    let score = game.score;
    let current = {...game.current};
    if(! isMatch(game, matchType)) {
        current.matchState = matchStatus.state = MatchState.NoMatch;
    }
    else {
        current.matchState = matchStatus.state = MatchState.Match;
        score += 1;
    }
    return {
        ...game,
        current,
        score,
        matchHistory: game.matchHistory.concat([matchStatus])
    };
}

function getRandomCellText() {
    const symbolIndex = Math.floor(Math.random() * availableCellTexts.length);
    return availableCellTexts[symbolIndex];
}

function getNextSymbol(game: Game): Symbol {
    
    const location = game.current.symbol.location;
    const row = Math.floor(Math.random() * 3);
    const column = Math.floor(Math.random() * 3);

    if(location.row == row && location.column == column) {
        return getNextSymbol(game);
    }

    return {text: getRandomCellText(), location: {row, column}};
}

export function newRound(game: Game): Game {
    return {
        ...game,
        round: game.round + 1,
        current: {symbol: getNextSymbol(game), matchState: MatchState.None},
        history: [
            game.current,
            ...game.history
        ]
    }
}
