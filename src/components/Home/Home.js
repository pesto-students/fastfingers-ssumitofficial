import React, { useState } from "react";
import "./Home.scss";
import Header from "../Header/Header"
import ScoreBoard from "../ScoreBoard";
import PlayArea from "../PlayArea/PlayArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    const [gameResults, setGameResults] = useState([]);
    const [timePassed, setTimePassed] = useState(0);
    const [runTimer, setRunTimer] = useState(true);

    const handleGameEnd = () => {
        setGameResults([...gameResults, timePassed]);
        setRunTimer(false);
    }

    const handleOnTimePassedChange = (currentTimePassed) => {
        setTimePassed(currentTimePassed);
    }

    return (
        <div>
            <Header runTimer={runTimer} onTimePassedChange={handleOnTimePassedChange}/>

            <div className="row px-5">
                <ScoreBoard gameResults={gameResults}/>
                <PlayArea handleGameEnd={handleGameEnd}/>
            </div>

            <div className="row px-5">
                <p className="stop-game">
                    <FontAwesomeIcon icon={faTimes} />
                    <span>STOP GAME</span>
                </p>
            </div>

        </div>
    );
}