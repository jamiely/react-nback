const defaultCellText = '💩';

export interface Game {
    // past symbols
    symbols: Symbol[];
    // current symbols
    current: Symbol;
    // n-back
    roundsBack: number;
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
    return {text: defaultCellText, location: {row: 0, column: 0}};
}

export function getIndexFromPosition(position: Position) {
    return position.row * 3 + position.column;
}

// returns true if n-back is true at this point
export function isMatch({roundsBack, symbols, current}: Game) {
    // if(roundsBack-1 >= symbols.length) return false;

    const symbolNRoundsBack = symbols[roundsBack - 1];
    return symbolNRoundsBack.location.row === current.location.row &&
        symbolNRoundsBack.location.column === current.location.column;
}

export function createGame(): Game {
    return {
        current: {text: defaultCellText, location: {row: 0, column: 0}},
        symbols: [],
        roundsBack: 2, // defaults to 2 back
    };
}

function getNextSymbol(game: Game): Symbol {
    const location = game.current.location;
    const row = Math.floor(Math.random() * 3);
    const column = Math.floor(Math.random() * 3);

    if(location.row == row && location.column == column) {
        return getNextSymbol(game);
    }

    return {text: defaultCellText, location: {row, column}};
}

export function newRound(game: Game): Game {
    return {
        ...game,
        current: getNextSymbol(game),
        symbols: [game.current, ...game.symbols]
    }
}
