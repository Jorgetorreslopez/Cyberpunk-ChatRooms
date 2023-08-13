import React from 'react';
import ChatBar from '../.././components/ChatBar/ChatBar';
import ChatBody from '../.././components/ChatBody/ChatBody';
import ChatFooter from '../.././components/ChatFooter/ChatFooter';
import { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';


const ChatPage = ({ socket, user, setUser, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   socket.on('messageResponse', (data) => setMessages([...messages, data]));
  // }, [socket, messages]);

  return (
    <div className="chat">
    <Logo />
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages}/>
        <ChatFooter socket={socket} username={username} room={room} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} />
        <UserLogOut user={user} setUser={setUser}/>
      </div>
    </div>
  );
};

export default ChatPage;