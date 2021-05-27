import './Grid.css';
import {Symbol, Position, getIndexFromPosition} from '../Game';

const SymbolComponent = () => {
    return <div className="symbol">?</div>;
}

interface CellProps {
    symbol: Symbol | undefined;
}

const Cell = ({symbol}: CellProps) => {
    return <div className="cell">{symbol?.text}</div>
}

export interface GridProps {
    symbol: Symbol
};

const Grid = (props: GridProps) => {
    const index = getIndexFromPosition(props.symbol.location);
    const cells = [...Array(9)].map((_, i) => {
        const symbol = index == i ? props.symbol : undefined;
        return <Cell key={i} symbol={symbol} />
    });
    return <div className="gridContainer">
        <div className="grid">{cells}</div>
    </div>;
}

export default Grid;
