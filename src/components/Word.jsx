import React, { useEffect, useState } from 'react';
import { useSocket } from "../context/SocketProvider";
import '../styles/Word.css';

const Word = ({setCurrentWord}) => {
  const [randomWord, setRandomWord] = useState('')
  const [isHost, setIsHost] = useState(false);
  const socket = useSocket();

    useEffect(() => {
      socket.on("receive_mesage", (data) => {
        let recievedMessage = data.message;
        if(recievedMessage === randomWord){
          alert("you guessed it!");
        }
      });
      socket.on("joinGame", ({word, hostSocketId})=>{
        if(hostSocketId === socket.id){
          setRandomWord(word);
        }else{
          setRandomWord(`length of the fruit is ${word.length}`);
        }
        setCurrentWord(word);
      })
      socket.on("changeWordRes", ({word, hostSocketId})=>{
        if(hostSocketId === socket.id){
          setRandomWord(word);
        }else{
          setRandomWord(`length of the word is ${word.length}`);
        }
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
