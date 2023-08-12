import React from 'react';
import ChatBar from '../.././components/ChatBar/ChatBar';
import ChatBody from '../.././components/ChatBody/ChatBody';
import ChatFooter from '../.././components/ChatFooter/ChatFooter';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';


const ChatPage = ({ socket, user, setUser }) => {
  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody />
        <ChatFooter socket={socket} />
        <UserLogOut user={user} setUser={setUser}/>
      </div>
    </div>
  );
};

export default ChatPage;