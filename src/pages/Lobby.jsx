import React, { useState, useCallback, useEffect } from "react";
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { server } from "../App";
// import { useSocket } from "../context/SocketProvider";

const socket = io.connect("http://localhost:3001");

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  // const socket = useSocket();
  const navigate = useNavigate();

  const submitHandler = async (e) =>{
    e.preventDefault();
    const {data} = await axios.post(`${server}/room/${room}`);
    console.log(data);
  }

  // const handleSubmitForm = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //   },
  //   [email, room, socket]
  // );

  // const handleJoinRoom = useCallback(
  //   (data) => {
  //     const { email, room } = data;
  //     navigate(`/room/${room}`);
  //   },
  //   [navigate]
  // );

  // useEffect(() => {
  //   socket.on("room:join", handleJoinRoom);
  //   return () => {
  //     socket.off("room:join", handleJoinRoom);
  //   };
  // }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;