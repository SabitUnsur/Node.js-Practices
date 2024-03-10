import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {socket,connectWebSocket} from "./websocket";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
function App() {
    const [data,setData]=useState( {
        labels: ['A Partisi', 'B Partisi', 'C Partisi', 'D Partisi', 'E Partisi', 'F Partisi'],
        datasets: [
            {
                label: '# of Votes',
                data: [50, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    })
    const [photo,setPhoto]= useState('')
  const [socketInput, setSocketInput] = useState('');
  useEffect(() => {
    connectWebSocket()
      socket.on('broadcastPhoto',(data)=>{
          if(data.id !== window.socketID){
              setPhoto(data.photo)
          }
      })// serverdan gelen broadcastPhoto eventini dinliyoruz

      socket.on('dataResult',(dataSet)=>{
          let _data = data.datasets[0].data
          for (let i = 0; i < _data.length; i++) {
                _data[i] += dataSet[i]
          }
          setData({...data,datasets:[ /*{...data ile diğer dataları alıp sadece datasetsi değiştiriyoruz}*/
                  {
                      label: '# of Votes',
                      data: _data,
                      backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                      ],
                      borderWidth: 1,
                  },
              ]})
          console.log('data',data)
      })
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
              socket.emit('publicMessage', {id: window.socketID, message: 'Merhaba herkese!'})
          }}>Yayınla
          </button>
          {/*servera publicMessage eventi gönderiyoruz*/}

          <button onClick={() => {
              socket.emit('join room', 'roomA')
          }}>A odasına katıl
          </button>

          <button onClick={() => {
              fetch('http://localhost:5000?text=Merhaba&id=' + window.socketID).then((res) => {
                  res.json()
              }).then((data) => {
                  console.log('data', data)
              }) // servera get request atıyoruz

          }}>Kayıt Oluştur
          </button>

          <button onClick={() => {
              fetch('http://localhost:5000/sendPhoto/?photo=https://unsplash.com/photos/a-group-of-birds-flying-over-a-body-of-water-gb3Nq47v4GA&id=' + window.socketID).then((res) => {
                  res.json()
              }).then((data) => {
                  console.log('data', data)
              })

          }}>Fotoğraf Gönder
          </button>

          <button onClick={() => {
              socket.emit('message room', {room: 'roomA', message: 'Merhaba roomA!'})
          }}>A odasına mesaj gönder
          </button>

          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <div style={{width: "500px", height: "500px"}}>
                  <Doughnut data={data}/>;
              </div>
          </div>

          <img src={photo} alt="photo" style={{width: "500px", height: "500px"}}/>
          {/* serverdan gelen photoyu gösteriyoruz  */}
      </>
  );
}


export default App;
