// AddContact.tsx
import React from 'react';
import SubmitDiv from '../components/styled/SubmitDiv';
import Form from '../components/styled/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../store';
import { InMemoryDB } from '../inmemorydb';

interface Props {
  db: InMemoryDB;
}

interface Contact {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  relationship: string;
  daysBeforeReminder: number;
  birthday: string;
}

const AddContact: React.FC<Props> = ({ db }) => {
  const { userId, setContacts } = useContext(StoreContext);
  const navigate = useNavigate();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      0: { value: string };
      1: { value: string };
      2: { value: string };
      3: { value: string };
      4: { value: string };
      5: { value: string };
    };

    const name = target[0].value;
    const surname = target[1].value;
    const phoneNumber = target[2].value;
    const relationship = target[3].value;
    const daysBeforeReminder = parseInt(target[4].value);
    const birthday = target[5].value;

	console.log(userId)

    if (userId != null) {
      const id = await db.addContact( {
        userId,
        name,
        surname,
        phoneNumber,
        relationship,
        daysBeforeReminder,
        birthday,
      });

      setContacts(await db.getContactsForUser(userId));
      navigate('/dashboard');
    } else {
      console.error('User ID is null');
    }
  }

  return (
	<>
		<h2>Add Contact</h2>
		<SubmitDiv>
			<Form onSubmit={handleSubmit}>
				<label>First Name:</label>
				<input type='text' placeholder='First Name' required></input>
				<label>Last Name:</label>
				<input type='text' placeholder='Last Name' required></input>
				<label>Phone Number:</label>
				<input type='text' placeholder='xxx-xxx-xxxx' required></input>
				<label>Relationship:</label>
				<select required>
					<option value='friend'>Friend</option>
					<option value='family'>Family</option>
					<option value='significant other'>Significant Other</option>
					<option value='coworker'>Coworker</option>
				</select>
				<label>Days Before Reminder:</label>
				<input
					type='text'
					placeholder='Days before reminder'
					required></input>
				<label>Birthday:</label>
				<input type='date' required />

				<button type='submit'>Add Contact</button>
			</Form>
		</SubmitDiv>
		<Link to='/dashboard'>
			<button style={{ margin: '20px' }}>← Back to Dashboard</button>
		</Link>
	</>
	);
};

export default AddContact;
