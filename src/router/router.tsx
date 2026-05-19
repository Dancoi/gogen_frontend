import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import UserProfile from '../pages/UserProfile/UserProfile.tsx';
import Login from '../pages/Auth/Login.tsx';
import Register from '../pages/Auth/Register.tsx';
import PrivateRoute from '../components/PrivateRoute.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/profile',
        element: (
            <PrivateRoute>
                <UserProfile />
            </PrivateRoute>
        ),
    },
]);