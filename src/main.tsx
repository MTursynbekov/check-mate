import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddContact from './pages/AddContact.tsx';
import AddChat from './pages/AddChat.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Contact from './pages/Contact.tsx';
import StoreProvider from './store.tsx';
import EditChat from './pages/EditChat.tsx';
import EditContact from './pages/EditContact.tsx';
import './index.css';
import { InMemoryDB} from './inmemorydb.tsx';

const db = new InMemoryDB();
const router = createBrowserRouter([
	{ path: '/', element: <Login db={db} /> },
	{ path: '/signup', element: <Signup db={db} /> },
	{ path: '/dashboard', element: <Dashboard /> },
	{ path: '/addcontact', element: <AddContact db={db} /> },
	{ path: '/addchat', element: <AddChat db={db} /> },
	{ path: '/contact/:id', element: <Contact db={db} /> },
	{ path: '/chat', element: <AddChat db={db} /> },
	{ path: '/editchat', element: <EditChat db={db} /> },
	{path: '/editcontact', element: <EditContact db={db} />}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<StoreProvider>
			<RouterProvider router={router}>
				<App />
			</RouterProvider>
		</StoreProvider>
	</React.StrictMode>
);
