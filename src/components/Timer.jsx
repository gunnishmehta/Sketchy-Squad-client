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
          socket.emit('changeWordReq', seconds =>{
            console.log('changeWordReq');
          });

          return 60;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [socket]);


  useEffect(() => {
    socket.on("joinGame", ({ time }) => {
      console.log('timer start');
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
