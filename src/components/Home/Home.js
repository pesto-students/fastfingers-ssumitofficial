import React, { useState } from "react";
import "./Home.scss";
import Header from "../Header/Header"
import ScoreBoard from "../ScoreBoard";
import PlayArea from "../PlayArea/PlayArea";
import { formatTime } from "../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { Constants } from "../../Constants";

let restartGameCounterValue = 5;
let restartTimer = () => { };

export default function Home() {
    const [gameResults, setGameResults] = useState([]);
    const [timePassed, setTimePassed] = useState(0);
    const [gameId, setGameId] = useState(1);
    const [runTimer, setRunTimer] = useState(true);
    const [difficultyLevel, setDifficultyLevel] = useState(Number(sessionStorage.getItem(Constants.DIFFICULTY_LEVEL)));
    const [restartGameCounter, setRestartGameCounter] = useState(restartGameCounterValue);

    const handleGameEnd = () => {
        if (gameResults.length > 7) {
            gameResults.shift();
        }

        setGameResults([...gameResults, { gameId, timePassed: (timePassed * 1000) }]);
        setGameId(gameId + 1);
        setRunTimer(false);

        restartTimer = setInterval(() => {
            if (restartGameCounterValue === 1) {
                handlePlayAgain();
                return;
            }
            setRestartGameCounter(--restartGameCounterValue);
        }, 1000);
    }

    const handleOnTimePassedChange = (currentTimePassed) => {
        setTimePassed(currentTimePassed);
    }

    const hanldeQuitGame = () => {
        window.location.href = "/";
    }

    const handlePlayAgain = () => {
        restartGameCounterValue = 5
        setRestartGameCounter(restartGameCounterValue);
        clearInterval(restartTimer);
        setRunTimer(true);
    }

    const handleLevelUpgrade = (newLevel) => {
        setDifficultyLevel(newLevel);
        sessionStorage.setItem(Constants.DIFFICULTY_LEVEL, newLevel);
    }

    return (
        <div>
            <Header runTimer={runTimer} onTimePassedChange={handleOnTimePassedChange} difficultyLevel={difficultyLevel} />

            {
                runTimer ?
                    <div className="row px-5 d-flex flex-column-reverse flex-sm-row">
                        <ScoreBoard gameResults={gameResults} />
                        <PlayArea handleGameEnd={handleGameEnd} handleLevelUpgrade={handleLevelUpgrade} />
                    </div>
                    :
                    <div className="row">
                        <div className="col-12 game-result">
                            <p className="text-white p-0 m-0 pt-5 title">SCORE:GAME{gameId - 1}</p>
                            <p className="text-white p-0 m-0 time">{formatTime(timePassed * 1000, "mm:ss")}</p>
                            {
                                Math.max(...gameResults.map(({ timePassed }) => { return timePassed })) < timePassed ?
                                    <p className="text-white p-0 m-0 high-score">New High Score</p>
                                    : ''
                            }
                            <p className="play-again mt-4" onClick={handlePlayAgain}><FontAwesomeIcon icon={faRedoAlt} /> PLAY AGAIN</p>
                            <p className="text-white auto-start-text">Game will restart in {restartGameCounter} seconds</p>
                        </div>
                    </div>
            }

            {
                runTimer ?
                    <div className="row px-5 mt-sm-5 mb-2">
                        <p className="stop-game" onClick={handleGameEnd}>
                            <FontAwesomeIcon icon={faTimes} />
                            <span>STOP GAME</span>
                        </p>
                    </div> :
                    <div className="row px-5 fixed-bottom mb-2">
                        <p className="stop-game">
                            <span onClick={hanldeQuitGame}>QUIT</span>
                        </p>
                    </div>
            }

        </div>
    );
}