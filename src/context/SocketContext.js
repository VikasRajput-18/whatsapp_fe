import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

function SocketContextProvider({ children }) {
  // socket io
  const socket = io(process.env.REACT_APP_SERVER_ENDPOINT);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default SocketContextProvider;
