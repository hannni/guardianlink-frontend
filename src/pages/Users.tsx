import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../services/auth';

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/users/', {
                headers: getAuthHeaders(),
            })
            .then((res) => setUsers(res.data))
            .catch((err) => setError('Unauthorized or error loading users.'));
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} ({user.email}) - Role: {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
