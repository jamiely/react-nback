import React from "react";
import Choose from "./Choose";
import './InfoBar.css';

interface InfoBarProps {
    onLocationClick: () => void;
    onSymbolClick: () => void;
    onAudioClick: () => void;
    children?: any;
}

function InfoBar(props: InfoBarProps) {
    return <div className="infoBar">
        2-Back 
        <Choose onClick={props.onLocationClick} text="(L)ocation" />
        <Choose onClick={props.onSymbolClick} text="Symbol (K)" />
        <Choose onClick={props.onAudioClick} text="Audio (J)" />
        {props.children}
    </div>;
}
export default InfoBar;