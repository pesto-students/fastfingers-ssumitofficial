import React, { useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import "./PlayArea.scss";
import CountDown from "../CountDown/CountDown";
import { Constants } from "../../Constants";
import data from "../../assets/data/dictionary.json";
import TargetWord from "../TargetWord/TargetWord";

export default function PlayArea({ handleGameEnd, handleLevelUpgrade }) {
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

        const newTimeLimit = Math.ceil(newTargetWord.length / difficultyLevel) * 1000;
        setTargetWord(newTargetWord);
        setTimeLimit(newTimeLimit > 2000 ? newTimeLimit : 2000);
        setUserInput('');
    }

    const handleTextChange = (e) => {
        setUserInput(e.target.value);
        if (targetWord.toLocaleLowerCase() === e.target.value.toLocaleLowerCase()) {
            setRandomWord();

            const newDifficultyLevel = Number((difficultyLevel + 0.01).toFixed(1));
            setDifficultyLevel(newDifficultyLevel);

            if(newDifficultyLevel === 1.5){
                handleLevelUpgrade(1.5);
            }
            else if(newDifficultyLevel === 2.0){
                handleLevelUpgrade(2);
            }
        }
    }

    useEffect(() => {
        setRandomWord();
    }, []);

    return (
        <div className="col-12 col-sm-8 p-0 mt-4 mt-sm-0 text-right timer-container">
            <CountDown timeLimit={timeLimit} key={targetWord} handleGameEnd={handleGameEnd} />
            <TargetWord targetWord={targetWord} userInput={userInput} />
            <input className="user-input-word" type="text" value={userInput} onChange={handleTextChange} />
        </div>
    );
}

PlayArea.protoTypes = {
    handleGameEnd: ProtoTypes.func.isRequired,
    handleLevelUpgrade: ProtoTypes.func.isRequired
}