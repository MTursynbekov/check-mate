import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubmitDiv from '../components/styled/SubmitDiv';
import Form from '../components/styled/Form';
import { StoreContext } from '../store';
import { InMemoryDB } from '../inmemorydb';
import { signUp } from '../components/signUp';
import { jwtDecode } from 'jwt-decode';

interface Props {
  db: InMemoryDB;
}

const Signup: React.FC<Props> = ({ db }) => {
  const { setUser, setLoggedIn, setUserId } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      [index: number]: { value: string };
    };
    const username = target[0].value;
    const password1 = target[1].value;
    const password2 = target[2].value;
    const phoneNumber = target[3].value;

    if (password1 !== password2) {
      window.alert('Passwords do not match');
      return;
    }

    if (!phoneNumber.match(/^\d{3}-\d{3}-\d{4}$/gm)) {
      window.alert('Phone number format incorrect. Ex: 123-456-7890');
      return;
    }

    try {
      const response = await signUp({ username, password: password1, phone: phoneNumber });
      const token = response.token;

      
      const decodedToken: { userId: number } = jwtDecode(token);
      setUserId(decodedToken.userId);
      setUser(username);
      setLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
    }
      
  };

  return (
    <>
      <h2>Sign-Up</h2>
      <SubmitDiv>
        <h4>Create Account</h4>
        <Form onSubmit={handleSubmit}>
          <input type="text" placeholder="username" required />
          <input type="password" placeholder="password" required />
          <input type="password" placeholder="confirm password" required />
          <input type="text" placeholder="phone number" required />
          <button type="submit">Sign-Up</button>
        </Form>
      </SubmitDiv>

      <Link to="/">
        <button style={{ margin: '20px' }}>← Back to Login</button>
      </Link>
      <Link to="/dashboard">
        <p>Dashboard</p>
      </Link>
    </>
  );
};

export default Signup;
