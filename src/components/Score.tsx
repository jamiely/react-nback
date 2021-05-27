import './Score.css';

interface ScoreProps {
    score: number;
}

function Score({score}: ScoreProps) {
    return <div className="score">{score}</div>
}

export default Score;