import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/Forgotpassword';
import SignUpPage from '../pages/SignUpPage';

import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import ResetPassword from '../pages/Resetpassword';
import UserProfile from '../components/UserProfile';

import Wishlist from '../components/Wishlist'

import ManageOrders from '../pages/ManageOrders';
import OrderConfirmation from '../components/OrderConfirmation';

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
                    path: 'reset-password/:token',
                    element: <ResetPassword />
                },
                {
                    path: 'SignUp',
                    element: <SignUpPage />
                },
                {
                    path: 'product-category/:categoryName',
                    element: <CategoryProduct />
                },
                {
                    path: 'product/:id',
                    element: <ProductDetails />
                },
                {
                    path: 'cart',
                    element: <Cart />,
                },
                {
                    path: 'user-profile/:id',
                    element: <UserProfile />
                },
                {
                    path: 'wishlist',
                    element: <Wishlist />
                },
                {
                    path:'order-confirmation',
                    element:<OrderConfirmation />
                },

                {
                    path: 'admin-panel',
                    element: <AdminPanel />,
                    children: [
                        {
                            path: 'all-users',
                            element: <AllUsers />
                        },
                        {
                            path: 'all-products',
                            element: <AllProducts />
                        },
                        { path: 'manage-orders', 
                          element: <ManageOrders /> 
                        }
                    ]
                },

            ]
        }
    ]
);

export default router;
