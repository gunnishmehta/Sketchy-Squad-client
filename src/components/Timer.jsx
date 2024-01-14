import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from "../context/SocketProvider";
import '../styles/Timer.css';

const Timer = () => {
  const socket = useSocket();

  const [seconds, setSeconds] = useState(60);
  const intervalRef = useRef(null);


  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          setSeconds(60);
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);


  useEffect(() => {
    socket.on("joinGame", ({ time }) => {
      setSeconds(60 - time);
    })
  }, [socket])

  return (
    <div className="timerContainer">
      <div className="timerCircle">
        <h1 className="timerText">{seconds}</h1>
      </div>
    </div>
  );
};

export default Timer;
