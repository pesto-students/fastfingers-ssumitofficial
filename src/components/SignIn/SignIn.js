import React, { useState } from "react";
import "./SignIn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { Constants } from '../../Constants';

export default function SignIn() {
    const [userName, setUserName] = useState(sessionStorage.getItem(Constants.USER_NAME));
    const [difficultyLevel, setDifficultyLevel] = useState("1");
    const [isInvalidUserName, setIsInvalidUserName] = useState(false);

    const handleStartGameClick = () => {
        setIsInvalidUserName(userName.trim() === "");

        if (userName.trim() === "" || difficultyLevel === "") {
            return;
        }
        else {
            sessionStorage.setItem(Constants.USER_NAME, userName);
            sessionStorage.setItem(Constants.DIFFICULTY_LEVEL, difficultyLevel);
            window.location.href = "/home";
        }
    }

    const handleUserNameChange = (e) => {
        const { target: { value } } = e;
        setUserName(value);
        setIsInvalidUserName(!value || value.trim() === "");
    }

    return (
        <div className="container">
            <img className="game-icon" src='images/keyboard-icon.svg' alt="" />
            <p className="game-title">Fast  Fingers</p>
            <p className="game-sub-title">__________  the ultimate typing game  __________</p>

            <input type="text" className="text-left" name="userName" placeholder="type your name" value={userName} onChange={handleUserNameChange} />
            { isInvalidUserName ? <p className="validation-error text-left">Please enter username</p> : ''}

            <select value={difficultyLevel} onChange={e => setDifficultyLevel(e.target.value)}>
                <option value="1">EASY</option>
                <option value="1.5">MEDIUM</option>
                <option value="2">HARD</option>
            </select>

            <p className="start-game" onClick={handleStartGameClick}>
                <FontAwesomeIcon icon={faPlay} />
                <span>START GAME</span>
            </p>
        </div>
    );
}