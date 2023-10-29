import { useContext } from 'react';
import SubmitDiv from '../components/styled/SubmitDiv';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/styled/Form';
import { StoreContext } from '../store';
import { InMemoryDB } from '../inmemorydb';

interface Props {
	db: InMemoryDB;
  }

const Login: React.FC<Props> = ({ db }) => {
	const { setUser, setLoggedIn, setUserId, setContacts } =
		useContext(StoreContext);
	const navigate = useNavigate();

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
		  [index: number]: { value: string };
		};
		const username = target[0].value;
		const password = target[1].value;
	
		const userId = db.validateUser(username, password);
    	if (userId) {
      		setUser(username);
     		setLoggedIn(true);
      		setUserId(userId); 
      		setContacts(db.getContactsForUser(userId));
      		navigate('/dashboard');
    	}  else {
		  	window.alert('Invalid username or password');
		}
	  };

	return (
		<>
			<img id='main-logo' src='/chess-pieces.png' />
			<h1>CheckMate</h1>
			<h4 id='tagline'>Keep your connections in check</h4>
			<SubmitDiv>
				<h2>Login</h2>
				<Form onSubmit={handleSubmit}>
					<input type='text' placeholder='username' required />
					<input type='password' placeholder='password' required />
					<button type='submit'>Login</button>
				</Form>
			</SubmitDiv>
			<p style={{ color: 'white' }}>Don't have an account?</p>
			<Link to='/signup'>
				<button style={{ margin: '10px' }}>Sign-up</button>
			</Link>
			<Link to='/dashboard'>
				<p> To Dashboard </p>
			</Link>
		</>
	);
}

export default Login;
