import React, { useEffect, useState } from 'react';
import { useSocket } from "../context/SocketProvider";
import '../styles/Word.css';

const Word = () => {
  const [randomWord, setRandomWord] = useState('abcd')
  const socket = useSocket();

    useEffect(() => {
      socket.on("receive_mesage", (data) => {
        let recievedMessage = data.message;
        if(recievedMessage === randomWord){
          alert("you guessed it!");
        }
      });
      socket.on("joinGame", ({word})=>{
        setRandomWord(word);
      })
      // socket.on("startGame", ({word})=>{
      //   setRandomWord(word);
      // })
    }, [socket])
    
    
  return (
    <div className='wordComponent'>
      <h3>{randomWord}</h3>
    </div>
  )
}

export default Word
