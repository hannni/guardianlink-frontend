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
            <Link to="/">About</Link>

            {token && <Link to={getDashboardPath()}>Dashboard</Link>}
            {token && <Link to="/messages">Messages</Link>}
            {token && <Link to="/profile">Profile</Link>} {/* ✅ NEW LINE */}

            {role === 'admin' && <Link to="/users">Browse All Users</Link>}
            {role === 'ngo' && <Link to="/volunteers">Browse Volunteers</Link>}
            {role === 'volunteer' && <Link to="/ngos">Browse NGOs</Link>}

            {!token && (
                <>
                    <Link to="/register/volunteer" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        Volunteer Signup
                    </Link>
                    <Link to="/register/ngo" className="text-sm font-medium text-green-600 hover:text-green-800">
                        NGO Signup
                    </Link>
                </>
            )}

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
