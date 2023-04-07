
import React from "react";
import {io} from "socket.io-client"
import { useMemo, useContext } from "react";

const SocketContext = React.createContext(null);

export const useSocket = () => {
    return React.useContext(SocketContext);
}

export const SocketProvider = (props) => {
    const socket = io("http://localhost:8900")
    return (
        <SocketContext.Provider value={{socket}}>
            {props.children}
        </SocketContext.Provider>
    )
}