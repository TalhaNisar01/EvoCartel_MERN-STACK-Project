import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import summaryApi from '../common/index';
import Loading from '../loading';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        setLoading(false);
        return;
    }

    try {
        const response = await fetch(summaryApi.resetPassword.url, {
            method: summaryApi.resetPassword.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword: password }), // Ensure field names match
        });

        const data = await response.json();
        if (response.ok) { // Check response.ok instead of data.success
            setMessage("Password has been reset successfully.");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            setMessage(data.message || "Something went wrong. Please try again.");
        }
    } catch (error) {
        setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleResetPassword} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;



