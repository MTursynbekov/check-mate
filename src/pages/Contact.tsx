import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Message from './Message';
import MessageContainerDiv from '../components/styled/MessageContainerDiv';
import MessageDiv from '../components/styled/MessageDiv';
import { StoreContext } from '../store';
import iconSrc from '../utils/iconSrc';
import { InMemoryDB } from '../inmemorydb';

interface Props {
	db: InMemoryDB;
}

const Contact: React.FC<Props> = ({ db }) => {
	const [messages, setMessages] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	const { currentContact, userId } = React.useContext(StoreContext);


	useEffect(() => {
		if (userId != null && id != null) {
			var y: number = +id;
			const data = db.getChats(userId, y);
			setMessages(data);
		}
	}, [refresh]);

	function handleClick() {
		navigate('/addchat');
	}

	const msgs = messages.map((msg) => {
		return <Message setRefresh={setRefresh} message={msg} db={db} />;
	});

	return (
		<>
			<div className='contact-header'>
				<img className='relat-icon' src={iconSrc(currentContact.relationship)} />
				<span
					className='edit-contact-icon'
					onClick={() => {
						navigate('/editcontact');
					}}>
					✏️
				</span>
				<h2>
					{currentContact.name} {currentContact.surname}
				</h2>
				<div style={{ marginTop: '10px' }}>
					<h3>📞 {currentContact.phoneNumber}</h3>
					<h4>
						🎂{' '}
						{new Date(Date.parse(currentContact.birthday)).toLocaleDateString()}
					</h4>
				</div>
			</div>
			<div className='call-log-container'>
				<h3>Chat Log</h3>
				<button
					style={{ width: '200px', margin: '20px 0' }}
					onClick={handleClick}>
					<span style={{ padding: '0 10px' }}>💬</span>Add Chat
				</button>
				<MessageContainerDiv>{msgs}</MessageContainerDiv>
			</div>
			<Link to='/dashboard'>
				<button style={{ margin: '20px' }}>← Back to Dashboard</button>
			</Link>
		</>
	);
}

export default Contact;
