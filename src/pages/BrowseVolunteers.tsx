import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

interface Volunteer {
    id: number;
    user: User;
    available_hours: number;
    criminal_check: boolean;
}

const BrowseVolunteers: React.FC = () => {
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get('http://localhost:8000/api/volunteers/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => setVolunteers(res.data))
            .catch((err) => console.error('Failed to fetch volunteers:', err));
    }, []);

    return (
        <div>
            <h2>Browse Volunteers</h2>
            {volunteers.length === 0 ? (
                <p>No volunteers available.</p>
            ) : (
                <ul>
                    {volunteers.map((vol) => (
                        <li key={vol.id} style={{ marginBottom: '20px' }}>
                            <div>
                                <strong>First Name:</strong> {vol.user.first_name}<br />
                                <strong>Last Name:</strong> {vol.user.last_name}
                            </div>
                            Username (for message): {vol.user.username}<br />
                            Email: {vol.user.email}<br />
                            Available Hours: {vol.available_hours}<br />
                            Criminal Background Check: {vol.criminal_check ? 'Verified (Passed)' : 'Not Verified'}<br />
                            <button
                                onClick={() =>
                                    window.location.href = `mailto:${vol.user.email}?subject=Cybersecurity Support Needed&body=Hello ${vol.user.first_name},`
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

export default BrowseVolunteers;
