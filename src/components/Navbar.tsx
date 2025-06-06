import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const getDashboardPath = () => {
        switch (role) {
            case 'admin':
                return '/admin/dashboard';
            case 'ngo':
                return '/ngo/dashboard';
            case 'volunteer':
                return '/volunteer/dashboard';
            default:
                return '/dashboard';
        }
    };

    return (
        <div className="navbar">
            <Link to="/">Home</Link>

            {token && <Link to={getDashboardPath()}>Dashboard</Link>}
            {role === 'admin' && <Link to="/users">Manage Users</Link>}
            {role === 'ngo' && <Link to="/dashboard">Browse Volunteers</Link>}
            {role === 'volunteer' && <Link to="/dashboard">Browse NGOs</Link>}

            <div>
                {token ? (
                    <>
            <span style={{ marginRight: '10px' }}>
              Logged in as <strong>{role?.toUpperCase()}</strong>
            </span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
