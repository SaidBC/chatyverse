import io from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const socket = io(SERVER_URL, { autoConnect: false });

export default socket;
