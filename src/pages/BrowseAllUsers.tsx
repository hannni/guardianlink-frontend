import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    is_staff: boolean;
    is_superuser: boolean;
}

const BrowseAllUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get('http://localhost:8000/api/users/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => setUsers(res.data))
            .catch((err) => console.error('Failed to fetch users:', err));
    }, []);

    return (
        <div>
            <h2>Browse All Users</h2>
            {users.length === 0 ? (
                <p>No users available.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} style={{ marginBottom: '20px' }}>
                            <div>
                                <strong>First Name:</strong> {user.first_name}<br />
                                <strong>Last Name:</strong> {user.last_name}
                            </div>
                            Username (for message): {user.username}<br />
                            Role: {user.role}<br />
                            Email: {user.email}<br />
                            Admin Privileges: {user.is_staff ? 'Yes' : 'No'}<br />
                            <button
                                onClick={() =>
                                    window.location.href = `mailto:${user.email}?subject=GuardianLink Admin Contact&body=Hello ${user.first_name},`
                                }
                            >
                                Send Email
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BrowseAllUsers;
