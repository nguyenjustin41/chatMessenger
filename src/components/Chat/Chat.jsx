import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import UsersContainer from '../UsersContainer/UsersContainer'
import './Chat.css'

let socket;

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message , setMessage] = useState('')
    const [messages , setMessages] = useState([])
    const [users, setUsers] = useState('')
    let location = useLocation()
    const ENDPOINT = 'https://socket-messenger-application.herokuapp.com/'
    // const ENDPOINT = 'http://localhost:5000'
    useEffect(() => {  
        console.log('just connected')
        // takes the param values and parses them into their useStates
        const {name, room} = queryString.parse(location.search)

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
      

        socket.emit("join", { name, room }, () => {
            console.log('callback here')
            
        });

        // unmount
        return () => {
            socket.emit("disconnect")
            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            
            
            setMessages([...messages, message])
        
        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, [messages])
    

        
    // function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <UsersContainer users={users}/>
        </div>
    )
}

export default Chat
