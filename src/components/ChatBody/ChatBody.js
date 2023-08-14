import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messageList, setMessageList, socket }) => {
	const navigate = useNavigate();

	const handleLeaveChat = () => {
		localStorage.removeItem('userName');
		navigate('/');
		window.location.reload();
	};

  useEffect(() => {
		socket.on('receive_message', (data) => {
			console.log('receive_message', data);
			setMessageList((list) => [...list, data]);
		})
	}, [socket, setMessageList]);

	return (
		<>
			<header className="chat__mainHeader">
				<p>LoFi Chat</p>
				<button className="leaveChat__btn" onClick={handleLeaveChat}>
					LEAVE CHAT
				</button>
			</header>

			<div className="message__container">
				{messageList.map((messageContent) => {
					console.log('Rendering:', messageContent.message);
					return messageContent.author === localStorage.getItem('userName') ? (
						<div className="message__chats" key={messageContent.id}>
							<p className="sender__name">You</p>
							<div className="message__sender">
								<p>{messageContent.message}</p>
							</div>
						</div>
					) : (
						<div className="message__chats" key={messageContent.id}>
							<p>{messageContent.author}</p>
							<div className="message__recipient">
								<p>{messageContent.message}</p>
							</div>
						</div>
					)
          
				})}

				<div className="message__status">
					{/* <p>Someone is typing...</p> */}
				</div>
			</div>
		</>
	);
};

export default ChatBody;
