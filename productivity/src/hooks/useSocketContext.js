import React from 'react';

import { SocketContext } from "../context/Socket.context";

const useSocketContext = () => React.useContext(SocketContext);

export default useSocketContext;