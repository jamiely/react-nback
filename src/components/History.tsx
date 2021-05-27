import { Game, Symbol, getIndexFromPosition } from "../Game";
import './History.css';

interface HistoryProps {
    game: Game
};

interface HistoryItemProps {
    symbol: Symbol,
    historyIndex: number
};

function HistoryItem({symbol, historyIndex}: HistoryItemProps) {
    const index = getIndexFromPosition(symbol.location);

    function getCell(_: any, i: number) {
        const otherClassName = index === i ? ' selected' : '';
        return <div className={`cell ${otherClassName}`} key={i}>S</div>;
    }

    const n = historyIndex + 1;

    return <div className={`historyItem historyItem-${historyIndex}`}>
        n={n}
        <div className="grid">
        {[...Array(9)].map(getCell)}
        </div>
    </div>;
}

function History({game}: HistoryProps) {
    const symbols = game.symbols.slice(0, 10);
    return <div className="history">
        <h3>History</h3>
        <HistoryItem symbol={game.current} historyIndex={-1} />
        {symbols.map((symbol, historyIndex) => HistoryItem({symbol, historyIndex}))}
    </div>
};

export default History;
