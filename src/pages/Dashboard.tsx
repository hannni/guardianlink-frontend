import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../services/auth';
import { login } from '../services/auth';
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';


const Dashboard: React.FC = () => {
    const [message, setMessage] = useState<string>('Loading...');
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        console.log('Auth headers:', getAuthHeaders()); // debug purpose

        axios
            .get('http://127.0.0.1:8000/api/dashboard/', {
                headers: getAuthHeaders(),
            })
            .then((res) => {
                setMessage(res.data.message);
            })
            .catch((err) => {
                console.error('Dashboard error:', err);
                setMessage('Unauthorized or error');
            });
    }, []);

    return (
        <div>
            <h1><p>You are Logged in now</p>  <p> Please Click your "Dashboard" Menu on the Top.</p></h1>
            <p>{message}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;