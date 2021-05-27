interface ChooseProps {
    text: string;
    onClick: () => void;
}

function Choose({text, onClick}: ChooseProps) {
    return <div><button onClick={onClick}>{text}</button></div>;
}

export default Choose;

