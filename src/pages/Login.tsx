import { useContext } from 'react';
import SubmitDiv from '../components/styled/SubmitDiv';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/styled/Form';
import { StoreContext } from '../store';
import { InMemoryDB } from '../inmemorydb';
import { jwtDecode } from 'jwt-decode';
import { signIn } from '../components/signIn';
import Token from './Token';

interface Props {
	db: InMemoryDB;
}

const Login: React.FC<Props> = ({ db }) => {
	const { setUser, setToken, setLoggedIn, setUserId, setContacts } =
		useContext(StoreContext);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
		  [index: number]: { value: string };
		};
		const username = target[0].value;
		const password = target[1].value;
		

		try {
			const response = await signIn({ username, password: password});
			const token = response.token;
	
			const decodedToken: { userId: number } = jwtDecode(token);
			setUserId(decodedToken.userId);
			setToken(token);
			Token.accessToken = token
			setUser(username);
			setLoggedIn(true);
			setContacts(await db.getContactsForUser(decodedToken.userId));
			navigate('/dashboard');
		} catch (error) {
			console.error('Signin failed:', error);
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
