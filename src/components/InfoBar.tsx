import React from "react";
import Choose from "./Choose";
import './InfoBar.css';

interface InfoBarProps {
    onClick: () => void;
    children?: any;
}

function InfoBar({onClick, children}: InfoBarProps) {
    return <div className="infoBar">
        2-Back 
        <Choose onClick={onClick} text="(L)ocation" />
        {children}
    </div>;
}
export default InfoBar;