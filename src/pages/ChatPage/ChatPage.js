import React, { useState, useEffect, useRef } from 'react'
import ChatBar from '../.././components/ChatBar/ChatBar'
import ChatBody from '../.././components/ChatBody/ChatBody'
import ChatFooter from '../.././components/ChatFooter/ChatFooter'
// import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo'
import UserLogOut from '../../components/UserLogOut/UserLogOut'

const ChatPage = ({ socket, user, setUser, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messagelist, setMessageList] = useState([])
  const lastMessageRef = useRef(null)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messagelist])

  return (
    <div className='chat'>
      <ChatBar socket={socket} user={user} setUser={setUser} set />
      <div className='chat__main'>
        <ChatBody messageList={messagelist} setMessageList={setMessageList} socket={socket} lastMessageRef={lastMessageRef} />
        <ChatFooter socket={socket} username={username} room={room} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} />

        <UserLogOut user={user} setUser={setUser} />
      </div>
    </div>
  )
}

export default ChatPage
