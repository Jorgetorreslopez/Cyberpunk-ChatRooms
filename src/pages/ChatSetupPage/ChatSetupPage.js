import React from 'react';
import styles from './ChatSetupPage.module.scss';
import { useState, useEffect, useRef } from 'react';
import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import io from 'socket.io-client';

const ChatSetupPage = ({ user, setUser, socket, username }) => {
	const [room, setRoom] = useState('');

	const joinRoom = () => {
		if (username !== '' && room !== '') {
			socket.emit('join_room', room);
		}
	};

	return (
		<div className={styles.SetupPage}>
			<Logo />
			<h1>Join A Room</h1>
			<input
				type="text"
				// className={styles.Input}
				placeholder="Your name"
				onChange={(e) => {
					username = e.target.value;
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
	);
};

export default ChatSetupPage;
