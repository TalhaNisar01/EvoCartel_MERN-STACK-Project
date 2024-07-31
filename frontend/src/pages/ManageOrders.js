import React, { useState, useEffect } from 'react';
import axios from 'axios';
import summaryApi from '../common/index'; // Ensure you have the correct path
import './ProductDetails.css';


const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios({
                    url: summaryApi.getUserOrders.url,
                    method: summaryApi.getUserOrders.method,
                    withCredentials: true,
                });
                setOrders(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await axios({
                url: summaryApi.updateOrderStatus.url,
                method: summaryApi.updateOrderStatus.method,
                data: { orderId, status },
                withCredentials: true,
            });

            setOrders(prevOrders => prevOrders.map(order =>
                order._id === orderId ? { ...order, status: response.data.data.status } : order
            ));
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="manage-orders-container">
            <h2 className="manage-orders-header">Manage Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="manage-order-item">
                        <h3 className="manage-order-item-header">Order ID: {order._id}</h3>
                        <p className="manage-order-item-text">Ordered Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="manage-order-item-text">
                            Status:
                            <select
                                className="manage-order-item-select"
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </p>
                        <ul className="manage-order-item-list">
                            {order.items.map((item) => (
                                <li key={item.productId._id} className="manage-order-item-list-item">
                                    {item.productId.name} - Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p className="manage-order-item-total">Total Amount: ${order.totalAmount}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ManageOrders;