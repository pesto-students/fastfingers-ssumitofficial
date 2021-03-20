import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { Constants } from "../../Constants";
import { formatTime } from "../../util";

export default function Header({ runTimer, onTimePassedChange }) {

    const [userName] = useState(sessionStorage.getItem(Constants.USER_NAME));
    const [difficultyLevel] = useState(sessionStorage.getItem(Constants.DIFFICULTY_LEVEL));
    const [timePassed, setTimePassed] = useState(0);

    let difficultyLevelText = '';
    switch (difficultyLevel) {
        case "1":
            difficultyLevelText = 'EASY';
            break;
        case "1.5":
            difficultyLevelText = 'MEDIUM';
            break;
        default:
            difficultyLevelText = 'HARD';
            break;
    }

    useEffect(() => {
        if (runTimer) {
            const timeout = setInterval(() => {
                setTimePassed(timePassed + 1);
                onTimePassedChange(timePassed + 1);
            }, 1000);

            return () => {
                clearInterval(timeout);
            }
        }
        else {
            setTimePassed(0);
        }
    }, [timePassed, runTimer]);

    return (
        <div className="header-container px-5 py-4">
            <div className="row">
                <div className="col-sm-6 col-12">
                    <div className="row">
                        <div className="col-1">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className="col-9 text-left text-uppercase"> {userName} </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <FontAwesomeIcon icon={faGamepad} />
                        </div>
                        <div className="col-9 text-left"> LEVEL : {difficultyLevelText} </div>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="row">
                        <div className="col-12 text-left text-sm-right game-title mt-0">
                            <span>fast-fingers</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-left text-sm-right">
                            {
                                runTimer ? <span>SCORE: {formatTime(timePassed * 1000, "mm:ss")} </span> : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    runTimer: PropTypes.bool.isRequired,
    onTimePassedChange: PropTypes.func.isRequired
}

Header.defaultProps = {
    runTimer: false
}