import React from "react";
import BottomControlsCenter from "./BottomControlsCenter";
import BottomControlsRight from "./BottomControlsRight";
import BottomControlLeft from "./BottomControlLeft";

const BottomPlayer = React.memo(() => {
    return (
        <div className="playing-bar-main">
            <div className="player_controls-main">
                <BottomControlLeft />
                <BottomControlsCenter />
                <BottomControlsRight />
            </div>
        </div>
    );
});

export default BottomPlayer;