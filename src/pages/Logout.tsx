// src/pages/Logout.tsx
import { useEffect } from 'react';
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate('/login');
    }, []);

    return null;
};

export default Logout;