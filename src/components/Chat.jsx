import React, { useEffect, useState } from 'react';
import {socket} from '../service/SocketProvider'
import '../styles/Chat.css';

const Chat = ({currentWord}) => {
  const [message, setMessage] = useState("");
  const [isHost, setIsHost] = useState(false);

  const sendMessage = () => {
    socket.emit("send_message", (message));
    if(message === currentWord){
      alert('you guessed it!');
    }
  }

  const outPutMessage = (message) =>{
    const div = document.createElement('div');
    div.classList.add('message');

    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerHTML = `<span>${message.username} ${message.time}</span>`;
    div.appendChild(p);

    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);

    document.querySelector('.chat-messages').appendChild(div);
  }

  useEffect(() => {
    socket.on("receive_mesage", (message) => {
      console.log(message);
      outPutMessage(message);
    });
    socket.on("joinGame", ({hostSocketId }) => {
      if(hostSocketId === socket.id){
        setIsHost(true);
      }else{
        setIsHost(false);
      }
    })
    socket.on("changeWordRes", ({hostSocketId})=>{
      console.log(hostSocketId);
      if(hostSocketId === socket.id){
        setIsHost(true);
      }else{
        setIsHost(false);
      }
    })
  }, [socket])

  return (
    <div className='Chat'>
      <div className="inputContainer">
        <input
          disabled={isHost}
          placeholder='message...'
          onChange={(event) => {
            setMessage(event.target.value);
          }} />
        <button
          onClick={sendMessage} 
          className="sendButton">Send</button>
      </div>
      <div class='chat-messages'>
      </div>
    </div>
  )
}

export default Chat

/*
Why is the recieved message coming twice??
*/