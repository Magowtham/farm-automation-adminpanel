import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

function Socket(props) {
  const [isSocketDisconnected, setIsSocketDisconnected] = useState(true);
  const socket = useMemo(() => io(process.env.REACT_APP_SOCKET_URL), []);

  const handleSocketConnect = () => {
    setIsSocketDisconnected(false);
    console.log("connected");
  };

  const handleSocketDisconnect = () => {
    setIsSocketDisconnected(true);
    console.log("disconnected");
  };

  useEffect(() => {
    socket.on("connect", handleSocketConnect);
    socket.on("disconnect", handleSocketDisconnect);

    return () => {
      socket.off("disconnect", handleSocketDisconnect);
      socket.off("connect", handleSocketConnect);
    };
  });

  return (
    <SocketContext.Provider value={{ socket, isSocketDisconnected }}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default Socket;
