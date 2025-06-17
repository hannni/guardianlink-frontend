import React, { useState } from 'react';
import axios from 'axios';

const VolunteerRegister: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        user_email: '',
        contact_email: '',
        available_hours: '',
        criminal_check: false,
        resume: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        const checked = type === 'checkbox' ? target.checked : undefined;

        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, resume: e.target.files?.[0] || null });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();

        // User fields
        data.append('user.username', form.username);
        data.append('user.password', form.password);
        data.append('user.first_name', form.first_name);
        data.append('user.last_name', form.last_name);
        data.append('user.email', form.user_email);
        data.append('user.role', 'volunteer');

        // Volunteer profile fields
        data.append('contact_email', form.contact_email);
        data.append('available_hours', form.available_hours);
        data.append('criminal_check', form.criminal_check.toString());

        // Optional resume file
        if (form.resume) {
            data.append('resume', form.resume);
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/register/volunteer/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Volunteer registered successfully!');
            window.location.href = '/login';
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
                <h2 style={{ textAlign: 'center' }}><b>Volunteer Registration</b></h2>

                <label>Username:<br />
                    <input name="username" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Password:<br />
                    <input type="password" name="password" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>First Name:<br />
                    <input name="first_name" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Last Name:<br />
                    <input name="last_name" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Main Email Address:<br />
                    <input type="email" name="user_email" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Contact Email (public):<br />
                    <input type="email" name="contact_email" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Available Hours:<br />
                    <input type="number" name="available_hours" onChange={handleChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>Resume (optional):<br />
                    <input type="file" name="resume" onChange={handleFileChange} style={{ width: '100%' }} />
                </label><br /><br />

                <label>
                    <input type="checkbox" name="criminal_check" onChange={handleChange} />
                    {' '}I confirm I passed a criminal background check.
                </label><br /><br />

                <div style={{ textAlign: 'center' }}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default VolunteerRegister;
