import io from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const socket = io("http://localhost:8000/", { autoConnect: false });

export default socket;
