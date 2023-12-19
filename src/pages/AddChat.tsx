import React from 'react';
import { useContext } from 'react';
import SubmitDiv from '../components/styled/SubmitDiv';
import Form from '../components/styled/Form';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../store';
import { InMemoryDB } from '../inmemorydb';

interface Props {
	db: InMemoryDB;
}

const AddChat: React.FC<Props> = ({ db }) => {
	const navigate = useNavigate();
	const { currentContact, userId } = useContext(StoreContext);
	const ratingOptions = [];

	for (let i = 1; i <= 10; i++) {
		ratingOptions.push(<option value={i}>{i}</option>);
	}

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		const date = e.target[0].value;
		const messageText = e.target[1].value;
		const rating = e.target[2].value;


		if (userId != null && currentContact?.id != null) {
			db.addChat(userId, currentContact.id, date, messageText, rating);
			navigate(`/contact/${currentContact.id}`);
		} else {
			console.error('User ID or contact ID is missing');
		}
	}
	return (
		<>
			<h2>Add Chat</h2>
			<SubmitDiv>
				<Form onSubmit={handleSubmit}>
					<label>Date</label>
					<input type='date' />
					<label>Notes</label>
					<input type='text' placeholder='notes'></input>
					<label>Rating</label>
					<select>{ratingOptions}</select>
					<button type='submit'>Add Chat</button>
				</Form>
			</SubmitDiv>

			<Link to='/dashboard'>
				<button style={{ margin: '20px' }}>← Back to Dashboard</button>
			</Link>
		</>
	);
}

export default AddChat;
