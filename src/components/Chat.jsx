import React, { useEffect, useState } from 'react';
import { useSocket } from "../context/SocketProvider";
import '../styles/Chat.css';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isHost, setIsHost] = useState(false);
  const socket = useSocket();

  const sendMessage = () => {
    socket.emit("send_message", { message });
  }

  useEffect(() => {
    socket.on("receive_mesage", (data) => {
      let recievedMessage = document.createElement('p');
      recievedMessage.textContent = data.message;
      let container = document.getElementById('chatContainer');
      container.appendChild(recievedMessage);
    });
    socket.on("joinGame", ({hostSocketId }) => {
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
      <div id='chatContainer'>
          <h1>Messages: </h1>
      </div>
    </div>
  )
}

export default Chat

/*
Why is the recieved message coming twice??
*/