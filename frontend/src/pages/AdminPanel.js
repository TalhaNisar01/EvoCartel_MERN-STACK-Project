import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser, FaUsers, FaBoxOpen,FaJediOrder } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import '../App.css';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (user?.role !== ROLE.ADMIN) {
    //         navigate("/");
    //     }
    // }, [user, navigate]);

    return (
        <div className="admin-panel-container">
            <aside className="sidebar">
                <div className="profile-section">
                    <h1 className=''></h1>
                    <div className="profile-pic-container">
                        {user?.profilePic ? (
                            <img src={`http://localhost:8000/${user.profilePic}`} alt={user?.name} className="profile-pic" />
                        ) : (
                            <FaRegCircleUser className="profile-icon" />
                        )}
                    </div>
                    <p className="profile-name">{user?.name}</p>
                    <p className="profile-role">{user?.role}</p>
                </div>

                <nav className="nav-menu">
                    <Link to="all-users" className="nav-link">
                        <FaUsers /> Manage Users
                    </Link>
                    <Link to="all-products" className="nav-link">
                        <FaBoxOpen /> Manage Products
                    </Link>
                    <Link to="manage-orders" className="nav-link">
                        <FaJediOrder /> Manage Orders
                    </Link>
                </nav>
            </aside>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;


















