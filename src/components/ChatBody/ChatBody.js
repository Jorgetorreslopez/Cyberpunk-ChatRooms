import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatBody = ({ messageList, setMessageList, socket, lastMessageRef }) => {
	const navigate = useNavigate();

	const handleLeaveChat = () => {
		localStorage.removeItem('userName');
		navigate('/');
		window.location.reload();
	};

	useEffect(() => {
		socket.on('receive_message', (data) => {
			// const duplicatelist = messageList.find((message) => message.id === data.id)
			// console.log(duplicatelist);
			// if (duplicatelist) return;
			setMessageList((list) => [...list, data]);
			// const newData = new Set(messageList);
			// const newArray = Array.from(newData);
			// setMessageList(newArray);
		});
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
				<ScrollToBottom>
					{messageList.map((messageContent) => {
						console.log('Rendering:', messageContent.message);
						return messageContent.author ===
							localStorage.getItem('userName') ? (
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
						);
					})}
				</ScrollToBottom>
				<div ref={lastMessageRef} />
			</div>
		</>
	);
};

export default ChatBody;
