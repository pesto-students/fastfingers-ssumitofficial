import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { Constants } from "../../Constants";
import { formatTime } from "../../util";

export default function Header({ difficultyLevel, runTimer, onTimePassedChange }) {

    const [userName] = useState(sessionStorage.getItem(Constants.USER_NAME));
    const [timePassed, setTimePassed] = useState(0);
    const [difficultyLevelText, setDifficultyLevelText] = useState('');

    useEffect(() => {
        switch (difficultyLevel) {
            case 1:
                setDifficultyLevelText('EASY');
                break;
            case 1.5:
                setDifficultyLevelText('MEDIUM');
                break;
            default:
                setDifficultyLevelText('HARD');
                break;
        }
    }, [difficultyLevel]);

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
    }, [timePassed, runTimer, onTimePassedChange]);

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
    difficultyLevel: PropTypes.number.isRequired,
    runTimer: PropTypes.bool.isRequired,
    onTimePassedChange: PropTypes.func.isRequired
}

Header.defaultProps = {
    runTimer: false
}