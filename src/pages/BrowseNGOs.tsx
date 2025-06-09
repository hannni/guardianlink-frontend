import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

interface NGO {
    id: number;
    user: User;
    organization_name: string;
    poc_email: string;
    areas_of_concern: string;
}

const BrowseNGOs: React.FC = () => {
    const [ngos, setNgos] = useState<NGO[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        axios.get('http://localhost:8000/api/ngos/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => setNgos(res.data))
            .catch((err) => console.error('Failed to fetch NGOs:', err));
    }, []);

    return (
        <div>
            <h2>Browse NGOs</h2>
            {ngos.length === 0 ? (
                <p>No NGOs available.</p>
            ) : (
                <ul>
                    {ngos.map((ngo) => (
                        <li key={ngo.id} style={{ marginBottom: '20px' }}>
                            <strong>{ngo.user.first_name} {ngo.user.last_name}</strong>
                            Username: {ngo.user.username}<br />                            Organization: {ngo.organization_name}<br />
                            Email: {ngo.user.email}<br />
                            POC Email: {ngo.poc_email}<br />
                            Areas of Concern: {ngo.areas_of_concern}<br />
                            <button
                                onClick={() =>
                                    window.location.href = `mailto:${ngo.user.email}?subject=Cybersecurity Help&body=Hello ${ngo.user.first_name},`
                                }
                            >
                                Contact
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BrowseNGOs;
