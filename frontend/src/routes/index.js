import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/Forgotpassword'; 
import SignUpPage from '../pages/SignUpPage';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '',
                    element: <Home />
                },
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'forgot-password',
                    element: <ForgotPassword />
                },
                {
                    path: 'SignUp',
                    element: <SignUpPage />
                }
            ]
        }
    ]
);

export default router;
