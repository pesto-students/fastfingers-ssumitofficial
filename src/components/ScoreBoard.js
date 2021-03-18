import React from 'react';
import PropTypes from "prop-types";
import { formatTime } from "../util";

function ScoreBoard({ gameResults }) {
    const content = gameResults.map((element, index) => {
        return <p key={index} className="score-board-items">Game {index + 1}  : {formatTime(element)}</p>;
    });

    return (
        <div className="col-2 p-0 border score-board p-3 text-left">
            <p className="score-board-title text-center">SCORE BOARD</p>
            {content}
        </div>
    );
}

ScoreBoard.propTypes = {
    gameResults: PropTypes.array
}

export default React.memo(ScoreBoard);