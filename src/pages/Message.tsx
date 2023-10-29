import React, { useContext } from 'react';
import MessageDiv from '../components/styled/MessageDiv';
import MessageTitle from '../components/styled/MessageTitle';
import MessageContainerDiv from '../components/styled/MessageContainerDiv';
import { StoreContext } from '../store';
import { useNavigate } from 'react-router-dom';
import { InMemoryDB } from '../inmemorydb';

interface Props {
	db: InMemoryDB;
	message;
	setRefresh;
  }
  
  const Message: React.FC<Props> = ({ db, message, setRefresh }) => {
	const navigate = useNavigate();
	const { userId, currentContact, setCurrentMessage } = useContext(StoreContext);
  
	function handleDelete() {
	  if (confirm('Are you sure you want to delete this message?')) {
		db.deleteChat(message.chatId);
		window.alert('Message deleted');
		setRefresh((prev) => !prev);
	  }
	}

	return (
		<>
			<MessageDiv>
				<MessageTitle>
					<span>
						🗓️ {new Date(Date.parse(message.date)).toLocaleDateString()}
					</span>
					<span>rating: {message.rating}</span>
					<button
						className='edit-log'
						onClick={() => {
							setCurrentMessage(message);
							navigate('/editchat');
						}}>
						✏️
					</button>
					<button className='edit-log' onClick={handleDelete}>
						❌
					</button>
				</MessageTitle>
				<p className='log-text'>{message.messageText}</p>
			</MessageDiv>
		</>
	);
}

export default Message;
