import React from "react";
import Choose from "./Choose";
import './InfoBar.css';

interface InfoBarProps {
    onLocationClick: () => void;
    onSymbolClick: () => void;
    children?: any;
}

function InfoBar({onLocationClick, onSymbolClick, children}: InfoBarProps) {
    return <div className="infoBar">
        2-Back 
        <Choose onClick={onLocationClick} text="(L)ocation" />
        <Choose onClick={onSymbolClick} text="Symbol (K)" />
        {children}
    </div>;
}
export default InfoBar;