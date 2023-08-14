import React, { useState , useEffect } from 'react';

const ChatFooter = ({ socket, username, room, currentMessage, setCurrentMessage }) => {

	const handleSendMessage =  async (e) => {
		e.preventDefault();
		if (currentMessage !== '') {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				id: Math.floor(Math.random() * 1000000000000, 10),
				time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes()
			};

      await socket.emit('send_message', messageData);
      setCurrentMessage('');
		}
	};

	// useEffect(() => {
	// 	socket.on('receive_message', (data) => {
	// 		console.log(data);
	// 	})
	// }, [socket])

	return (
		<div className="chat__footer">
			<form className="form" >
				<input
					type="text"
					placeholder="Write message"
					className="message"
					value={currentMessage}
					onChange={(e) => setCurrentMessage(e.target.value)}
				/>
				<button className="sendBtn" onClick={handleSendMessage}>SEND</button>
			</form>
		</div>
	);
};

export default ChatFooter;
