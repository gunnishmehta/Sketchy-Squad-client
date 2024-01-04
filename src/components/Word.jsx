import React, { useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/Word.css';

const socket = io.connect("http://localhost:3001");

const Word = ({shouldReset, onWordReset}) => {
    const wordsArray = [
        'apple',
        'banana',
        'orange',
        'grape',
        'pineapple',
        'watermelon',
        'strawberry',
        'kiwi',
        'blueberry',
        'mango'
      ];
    useEffect(()=>{
      if(shouldReset){
        randomWord = randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
        onWordReset();
      }
    })

    useEffect(() => {
      socket.on("receive_mesage", (data) => {
        let recievedMessage = data.message;
        if(recievedMessage === randomWord){
          alert("you guessed it!");
        }
      });
    })

    var randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  return (
    <div className='wordComponent'>
      <h3>{randomWord}</h3>
    </div>
  )
}

export default Word
