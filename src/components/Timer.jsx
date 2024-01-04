import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import '../styles/Timer.css';

const socket = io.connect("http://localhost:3001");

const Timer = ({onTimerEnd}) => {
  const [seconds, setSeconds] = useState(60);
  const intervalRef = useRef(null);

  useEffect (() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          setSeconds(60);
          onTimerEnd();
          //reset word          
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onTimerEnd]);

  socket.on("request_data", (data)=>{
    socket.emit("requested_data", seconds)
  })

  return (
    <div className="timerContainer">
      <div className="timerCircle">
        <h1 className="timerText">{seconds}</h1>
      </div>
    </div>
  );
};

export default Timer;
