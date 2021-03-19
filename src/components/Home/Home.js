import React, { useState } from "react";
import "./Home.scss";
import Header from "../Header/Header"
import ScoreBoard from "../ScoreBoard";
import PlayArea from "../PlayArea/PlayArea";
import { formatTime } from "../../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    const [gameResults, setGameResults] = useState([]);
    const [timePassed, setTimePassed] = useState(0);
    const [runTimer, setRunTimer] = useState(true);

    const handleGameEnd = () => {
        if(gameResults.length > 7) {
            gameResults.shift();
        }
        setGameResults([...gameResults, timePassed]);
        setRunTimer(false);
    }

    const handleOnTimePassedChange = (currentTimePassed) => {
        setTimePassed(currentTimePassed);
    }

    const hanldeQuitGame = () => {
        sessionStorage.clear();
        window.location.href = "/";
    }

    const handlePlayAgain = () => {
        setRunTimer(true);
    }

    return (
        <div>
            <Header runTimer={runTimer} onTimePassedChange={handleOnTimePassedChange} />

            {
                runTimer ?
                    <div className="row px-5">
                        <ScoreBoard gameResults={gameResults} />
                        <PlayArea handleGameEnd={handleGameEnd} />
                    </div>
                    :
                    <div className="row">
                        <div className="col-12 game-result">
                            <p className="text-white p-0 m-0 pt-5 title">SCORE : GAME {gameResults.length}</p>
                            <p className="text-white p-0 m-0 time">{formatTime(timePassed)}</p>
                            {
                                Math.max(...gameResults) < timePassed ?
                                    <p className="text-white p-0 m-0 high-score">New High Score</p>
                                    : ''
                            }
                            <p className="play-again mt-4" onClick={handlePlayAgain}><FontAwesomeIcon icon={faTimes}/> PALY AGAIN</p>
                        </div>
                    </div>
            }

            {
                runTimer ?
                    <div className="row px-5 footer">
                        <p className="stop-game" onClick={handleGameEnd}>
                            <FontAwesomeIcon icon={faTimes} />
                            <span>STOP GAME</span>
                        </p>
                    </div> :
                    <div className="row px-5 footer">
                        <p className="stop-game">
                            <span onClick={hanldeQuitGame}>QUIT</span>
                        </p>
                    </div>
            }

        </div>
    );
}