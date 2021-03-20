import React, { useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import "./PlayArea.scss";
import CountDown from "../CountDown/CountDown";
import { Constants } from "../../Constants";
import data from "../../assets/data/dictionary.json";
import TargetWord from "../TargetWord/TargetWord";

export default function PlayArea({ handleGameEnd }) {
    const [targetWord, setTargetWord] = useState('');
    const [userInput, setUserInput] = useState('');
    const [timeLimit, setTimeLimit] = useState(-1);
    const [difficultyLevel, setDifficultyLevel] = useState(Number(sessionStorage.getItem(Constants.DIFFICULTY_LEVEL)));

    const setRandomWord = () => {
        let filteredData = [];
        //easy difficulty
        if (difficultyLevel < 1.5) {
            filteredData = data.filter(x => x.length <= 4);
        }
        //medium difficulty
        else if (difficultyLevel > 1.5 && difficultyLevel < 2) {
            filteredData = data.filter(x => (x.length >= 5 && x.length <= 8));
        }
        else {
            filteredData = data.filter(x => x.length > 8);
        }

        const newTargetWord = filteredData[Math.floor(Math.random() * filteredData.length)];

        const newTimeLimit = Math.ceil(newTargetWord.length / difficultyLevel);
        setTargetWord(newTargetWord);
        setTimeLimit(newTimeLimit > 2 ? newTimeLimit : 2);
        setUserInput('');
    }

    const handleTextChange = (e) => {
        setUserInput(e.target.value);
        if (targetWord.toLocaleLowerCase() === e.target.value.toLocaleLowerCase()) {
            setRandomWord();
            setDifficultyLevel(difficultyLevel + 0.1);
        }
    }

    useEffect(() => {
        setRandomWord();
    }, []);

    return (
        <div className="col-8 p-0 text-right timer-container">
            <CountDown timeLimit={timeLimit} key={targetWord} handleGameEnd={handleGameEnd} />
            <TargetWord targetWord={targetWord} userInput={userInput}/>
            <input type="text" value={userInput} onChange={handleTextChange} />
        </div>
    );
}

PlayArea.protoTypes = {
    handleGameEnd: ProtoTypes.func.isRequired
}