import React, { useState, useEffect } from "react";
import ProtoTypes from "prop-types";
import "./CountDown.scss";
import { formatTime } from "../../util";
const FULL_DASH_ARRAY = 283;
let timePassed = 0;
let timeout = '';

export default function CountDown({ timeLimit, handleGameEnd }) {
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [stroke, setStroke] = useState("283 283");

    useEffect(() => {
        timePassed = 0;
        setTimeLeft(timeLimit);
    }, [timeLimit]);

    useEffect(() => {
        timeout = setInterval(() => {
            if (timeLeft > 0) {
                //update timer
                timePassed += 100;
                setTimeLeft(timeLimit - timePassed);

                //update stroke
                const strokeValue = calculateTimeFraction(timeLeft, timeLimit);
                setStroke(`${strokeValue} ${FULL_DASH_ARRAY}`);
            }
            else if (timeLeft === 0) {
                handleGameEnd();
                clearInterval(timeout);
            }
        }, 100);

        return () => {
            clearInterval(timeout);
        }
    }, [timeLeft]);

    return (
        <div className="base-timer">
            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray={stroke}
                        className="base-timer__path-remaining info"
                        d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                            "
                    ></path>
                </g>
            </svg>
            {
                timeLeft !== -1 ?
                    <span className="base-timer__label">{formatTime(timeLeft)}</span>
                    : ''
            }
        </div>
    );
}

CountDown.protoTypes = {
    timeLimit: ProtoTypes.number.isRequired,
    handleGameEnd: ProtoTypes.func.isRequired
}

function calculateTimeFraction(timeLeft, timeLimit) {
    const rawTimeFraction = timeLeft / timeLimit;
    return (rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction)) * FULL_DASH_ARRAY;
}