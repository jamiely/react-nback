import { Game, getIndexFromPosition, HistoryItem } from "../Game";
import './History.css';

interface HistoryProps {
    game: Game;
};

interface HistoryItemProps {
    historyItem: HistoryItem;
    historyIndex: number;
};

function HistoryItemComponent({historyItem, historyIndex}: HistoryItemProps) {
    const index = getIndexFromPosition(historyItem.symbol.location);

    function getCell(_: any, i: number) {
        let otherClassName = '';
        let text = '\u00A0';
        if(index === i) {
            otherClassName = ' selected';
            text = historyItem.symbol.text;
        }

        return <div className={`cell ${otherClassName}`} key={i}>
            {text}
        </div>;
    }

    const n = historyIndex + 1;

    return <div className={`historyItem historyItem-${historyIndex} matchStatus-${historyItem.matchState}`}>
        {n}-back
        <div className="grid">
        {[...Array(9)].map(getCell)}
        </div>
        <div className="audio">{historyItem.symbol.audio}</div>
    </div>;
}

function History({game}: HistoryProps) {
    const history = game.history.slice(0, 10);
    return <div className="history">
        <h3>History</h3>
        <HistoryItemComponent historyItem={game.current} historyIndex={-1} />
        {history.map((historyItem, historyIndex) => HistoryItemComponent({historyItem, historyIndex}))}
    </div>
};

export default History;
