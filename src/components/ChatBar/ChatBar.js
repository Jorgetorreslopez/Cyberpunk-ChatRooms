import React, { useEffect, useState } from 'react'

import SpotifyPlayback from '../SpotifyPlayBack/SpotifyPlayback'

const ChatBar = ({ socket, user, setUser }) => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data))
  }, [socket, users])

  return (
    <div className='chat__sidebar'>
      <h2>Open Chat</h2>

      <div>
        <h4 className='chat__header'>ACTIVE USERS</h4>
        <div className='chat__users'>
          {users.map((user) => (
            <p key={user.socketId}>{user.username}</p>
          ))}
        </div>
      </div>

      <SpotifyPlayback />

    </div>
  )
}

export default ChatBar
