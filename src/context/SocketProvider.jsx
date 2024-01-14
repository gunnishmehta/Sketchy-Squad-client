import React, { createContext, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext(io.connect("http://localhost:3001"));

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};