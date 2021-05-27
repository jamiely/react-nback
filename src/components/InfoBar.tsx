import Choose from "./Choose";

interface InfoBarProps {
    onClick: () => void;
}

function InfoBar({onClick}: InfoBarProps) {
    return <div>2-Back <Choose onClick={onClick} text="Location" /></div>
}
export default InfoBar;