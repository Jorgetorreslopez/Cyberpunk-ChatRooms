import React, { useState } from 'react';

const ChatFooter = ({ socket, username, room }) => {
	const [currentMessage, setCurrentMessage] = useState('');

	// const handleSendMessage = (e) => {
	// 	e.preventDefault();
	// 	if (message.trim() && localStorage.getItem('userName')) {
	// 		socket.emit('message', {
	// 			text: message,
	// 			name: localStorage.getItem('userName'),
	// 			id: `${socket.id}${Math.random()}`,
	// 			socketID: socket.id
	// 		});
	// 	}
	// 	setMessage('');
	// };
	const handleSendMessage =  async (e) => {
		e.preventDefault();
		if (currentMessage !== '') {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes()
			};

      await socket.emit('send_message', messageData);
      setCurrentMessage('');
		}
	};

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
