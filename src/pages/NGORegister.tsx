// NGORegister.tsx
import React, { useState } from 'react';

const NGORegister: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        user_email: '',
        poc_email: '', // renamed for clarity
        organization_name: '',
        areas_of_concern: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        // Nested user fields
        formData.append('user.username', form.username);
        formData.append('user.password', form.password);
        formData.append('user.first_name', form.first_name);
        formData.append('user.last_name', form.last_name);
        formData.append('user.email', form.user_email);     // login email
        formData.append('user.role', 'ngo');

        // OrganizationProfile fields
        formData.append('organization_name', form.organization_name);
        formData.append('poc_email', form.poc_email);       // contact email
        formData.append('areas_of_concern', form.areas_of_concern);

        try {
            await fetch('http://127.0.0.1:8000/api/register/ngo/', {
                method: 'POST',
                body: formData
            });
            alert('NGO registered successfully!');
        } catch (err) {
            console.error(err);
            alert('Registration failed.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f9f9f9'
        }}>
            <form onSubmit={handleSubmit} style={{
                width: '400px',
                padding: '30px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'left'
            }}>
                <h2 style={{ textAlign: 'center' }}>
                    <b>NGO / Organization Registration</b>
                </h2>

                <label>Username (Login ID):<br />
                    <input name="username" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Password (Login Password):<br />
                    <input type="password" name="password" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>First Name:<br />
                    <input name="first_name" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Last Name:<br />
                    <input name="last_name" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Main Email Address:<br />
                    <input name="user_email" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Point of Contact Email Address (public):<br />
                    <input name="poc_email" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Organization Name:<br />
                    <input name="organization_name" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Areas of Concern:<br />
                    <textarea name="areas_of_concern" onChange={handleChange} style={{ width: '100%', height: '80px' }} />
                </label><br /><br />

                <div style={{ textAlign: 'center' }}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );

};

export default NGORegister;
