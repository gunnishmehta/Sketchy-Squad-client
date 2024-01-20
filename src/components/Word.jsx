import React, { useEffect, useState } from 'react';
import { useSocket } from "../context/SocketProvider";
import '../styles/Word.css';

const Word = ({setCurrentWord}) => {
  const [randomWord, setRandomWord] = useState('')
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
        setCurrentWord(word);
      })
      socket.on("changeWordRes", (word)=>{
        setRandomWord(word);
        setCurrentWord(word);
      })
    }, [socket])
    
    
  return (
    <div className='wordComponent'>
      <h3>{randomWord}</h3>
    </div>
  )
}

export default Word
