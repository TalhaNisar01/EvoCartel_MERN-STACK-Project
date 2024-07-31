
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import summaryApi from '../common/index';
import './UserProfile.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading'; // Make sure the path is correct

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePic: '',
    role: '',
    createdAt: '',
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);



  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Shipped':
        return 'status-shipped';
      case 'Delivered':
        return 'status-delivered';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!id) {
        setError("User ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios({
          url: summaryApi.userProfile(id).url,
          method: summaryApi.userProfile(id).method,
          withCredentials: true,
        });
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios({
          url: summaryApi.getUserOrders.url,
          method: summaryApi.getUserOrders.method,
          withCredentials: true,
        });
        setOrders(response.data.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };




    fetchUserProfile();
    fetchOrders();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const handleRemoveNewImage = () => {
    setProfilePicFile(null);
    setProfilePicPreview(null);
  };


 




  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    if (profilePicFile) {
      formData.append('profilePic', profilePicFile);
    }

    try {
      setLoading(true);
      const response = await axios({
        url: summaryApi.updateUserDetails(id).url,
        method: summaryApi.updateUserDetails(id).method,
        data: formData,
        withCredentials: true,
      });
      setUser(response.data.data);
      setLoading(false);
      toast.success(response.data.message, {
        position: 'top-center',
        autoClose: 3000,
        style: {
          background: 'linear-gradient(to right, #4a90e2, #9013fe)',
          color: '#fff',
        },
      });
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setLoading(false);
      toast.error(error.response?.data?.message || error.message, {
        style: {
          background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
          color: 'white',
        },
      });
    }
  };

  const handleDeleteUser = async () => {
    if (confirmEmail !== user.email) {
      toast.error('Email does not match', {
        style: {
          background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
          color: 'white',
        },
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios({
        url: summaryApi.deleteUser(id).url,
        method: summaryApi.deleteUser(id).method,
        withCredentials: true,
      });
      setLoading(false);
      toast.success(response.data.message, {
        position: 'top-center',
        autoClose: 3000,
        style: {
          background: 'linear-gradient(to right, #4a90e2, #9013fe)',
          color: '#fff',
        },
      });
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setLoading(false);
      toast.error(error.response?.data?.message || error.message, {
        style: {
          background: 'linear-gradient(to right, #e94e77, #ff6b6b)',
          color: 'white',
        },
      });
    }
  };

  if (loading) return <Loading />; // Use Loading component here
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile-container">
      <ToastContainer />
      <div className="user-profile-sidebar">
        <h2 className="sidebar-heading">Account Settings</h2>
        <ul className="sidebar-menu">
          <li className="sidebar-item"><a href="#">User Profile</a></li>
          <Link to="/forgot-password" className="sidebar-item"><a>Change Password</a></Link>
          <li className="sidebar-item">
            <button onClick={() => setShowOrders(true)} className="btn-view-orders">
              Track Your Orders
            </button>
          </li>
        </ul>
        <div className="sidebar-info">
          <p><strong>Current User:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
      <div className="user-profile-details">
        <h2 className='text-gray-700'>Hey Welcome Back  <span className='text-blue-600'>{user.name}</span> 💫</h2>
        <h1 className="details-heading">Personal Information</h1>
        <form onSubmit={handleUpdateUser} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePic">Profile Picture</label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handleFileChange}
              className="form-input"
            />
            <div className="profile-pic-container">
              {user.profilePic && (
                <div className="existing-pic">
                  <img src={`http://localhost:8000/${user.profilePic}`} alt="Profile" className="profile-pic-preview" />
                </div>
              )}
              {profilePicPreview && (
                <div className="new-pic" style={{ position: 'relative', border: '2px solid #4a90e2' }}>
                  <img src={profilePicPreview} alt="New Profile Preview" className="profile-pic-preview" />
                  <span className="new-pic-tag" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#4a90e2',
                    color: '#fff',
                    padding: '2px 5px',
                    fontSize: '12px',
                    borderRadius: '0 0 5px 0',
                  }}>New</span>
                  <button onClick={handleRemoveNewImage} style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'none',
                    border: 'none',
                    color: '#ff6b6b',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}>&times;</button>
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="role" className='role-group'>Role </label>
            <span className="readonly-note"> (This field is unchangeable. Please contact Admin for further info)</span>
            <input
              type="text"
              id="role"
              name="role"
              value={user.role}
              readOnly
              className="form-input readonly-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="createdAt">Created At</label>
            <input
              type="text"
              id="createdAt"
              name="createdAt"
              value={new Date(user.createdAt).toLocaleDateString()}
              readOnly
              className="form-input readonly-input"
            />
          </div>
          <button type="submit" className="btn-save">Update Profile</button>
          <button type="button" className="btn-delete" onClick={() => setShowDeleteModal(true)}>Delete User</button>
        </form>
        
      </div>
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>To confirm deletion, please enter the user's email:</p>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              className="form-input"
            />
            <div>
              <button className="btn-delete-confirm" onClick={handleDeleteUser}>Delete User</button>
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

{showOrders && (
        <div className="modal">
          <div className="modal-content order-modal-content">
            <span className="close" onClick={() => setShowOrders(false)}>&times;</span>
            <h2>Order Details</h2>
            {orders.length === 0 ? (
              <p>No orders found</p>
            ) : (
              orders.map((order) => (
                <div key={order._id} className={`order-item ${getStatusClass(order.status)}`}>
                  <h3>Order ID: {order._id}</h3>
                  <p>Ordered Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p>Status: {order.status}</p>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item._id}>{item.name} - Quantity: {item.quantity}</li>
                    ))}
                  </ul>
                  <p>Total Amount: ${order.totalAmount}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

