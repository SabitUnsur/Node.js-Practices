import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {socket,connectWebSocket} from "./websocket";
function App() {
  const [socketInput, setSocketInput] = useState('');
  useEffect(() => {
    connectWebSocket();
  }, []);
  return (
      <>
        <button onClick={() => {
          socket.emit('client', 'Merhaba server!, ben client')
        }}>Servera mesaj gönder
        </button>

        <input value={socketInput} onChange={(e) => {
          setSocketInput(e.target.value)
        }}/>
        <button onClick={() => {
          socket.emit('sendCustomMessage', {socketId: socketInput, message: 'Merhaba'})
        }}>Spesifik bir kullanıcıya mesaj gönder
        </button>

        <button onClick={() => {
          socket.emit('publicMessage', {id:window.socketID, message: 'Merhaba herkese!'})
        }}>Yayınla
        </button>


      </>
  );
}


export default App;
