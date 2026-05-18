import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import UserProfile from '../pages/UserProfile/UserProfile.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/profile',
        element: <UserProfile />,
    },
]);