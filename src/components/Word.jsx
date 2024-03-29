import React, { useEffect, useState } from 'react';
import {socket} from '../service/SocketProvider'
import '../styles/Word.css';

const Word = ({setCurrentWord}) => {
  const [randomWord, setRandomWord] = useState('');

    useEffect(() => {
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
