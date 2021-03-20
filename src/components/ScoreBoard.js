import React from 'react';
import PropTypes from "prop-types";
import { formatTime } from "../util";

function ScoreBoard({ gameResults }) {
    const bestScore = Math.max(...gameResults.map(({ timePassed }) => { return timePassed }));

    const content = gameResults.map(({ gameId, timePassed }) => {
        return (
            <div key={gameId}>
                {
                    timePassed === bestScore ?
                        <p className="p-0 m-0 personal-best">PERSONAL BEST</p>
                        : ''
                }
                <p className="score-board-items mb-1">Game {gameId}  : {formatTime(timePassed, "mm:ss")}</p>
            </div>
        );
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