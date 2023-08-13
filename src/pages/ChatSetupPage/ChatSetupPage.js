import React from 'react';
import styles from './ChatSetupPage.module.scss';
import { useState, useEffect, useRef } from 'react';
import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import ChatPage from '../ChatPage/ChatPage';

const ChatSetupPage = ({ user, setUser, socket }) => {
	const [room, setRoom] = useState('');
	const [username, setUsername] = useState('');
	const [inChat, setInChat] = useState(false);

	const joinRoom = () => {
		if (username !== '' && room !== '') {
			socket.emit('join_room', room);
			setInChat(true);
		}
	};

	return (
		<div >
			<Logo />
			{inChat ? (
				<ChatPage
					socket={socket}
					user={user}
					setUser={setUser}
					username={username}
					room={room}
				/>
			) : (
				<div className={styles.SetupPage}>
					<h1>Join A Room</h1>
					<input
						type="text"
						placeholder="Avatar Name"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="Room ID"
						onChange={(e) => {
							setRoom(e.target.value);
						}}
					/>
					<button onClick={joinRoom}>Join Room</button>
					<UserLogOut user={user} setUser={setUser} />
				</div>
			)}
		</div>
	);
};

export default ChatSetupPage;