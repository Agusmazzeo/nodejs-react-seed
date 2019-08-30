import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://167.71.167.77:3000");
// const socket = socketIOClient("http://localhost:3000");
export default socket;
