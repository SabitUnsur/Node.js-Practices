import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import {socket,connectWebSocket} from "./websocket";
function App() {
  useEffect(() => {
    connectWebSocket();
  }, []);
  return (
    <button onClick= {()=>{
        socket.emit('client','Merhaba server!, ben client')
    }}>Servera mesaj gönder</button>
  );
}

export default App;
