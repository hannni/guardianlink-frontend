import React, { useState } from 'react';
import axios from 'axios';

const VolunteerRegister: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        available_hours: '',
        criminal_check: false,
        resume: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;  // 👈 safely assert input
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

        // Append nested user fields
        data.append('user.username', form.username);
        data.append('user.password', form.password);
        data.append('user.first_name', form.first_name);
        data.append('user.last_name', form.last_name);
        data.append('user.email', form.email);
        data.append('user.role', 'volunteer');

        // Append volunteer-specific fields
        data.append('available_hours', form.available_hours);
        data.append('criminal_check', form.criminal_check.toString());
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
        } catch (err) {
            console.error(err);
            alert('Registration failed.');
        }
    };

    return (
        <div>
            <h2><b>Volunteer Registration</b></h2>
            <form onSubmit={handleSubmit}>
                <label>Username (Login ID):<br/><input name="username" onChange={handleChange} /></label><br/>
                <label>Password (Login Password):<br/><input type="password" name="password" onChange={handleChange} /></label><br/>
                <label>First Name:<br/><input name="first_name" onChange={handleChange} /></label><br/>
                <label>Last Name:<br/><input name="last_name" onChange={handleChange} /></label><br/>
                <label>Email:<br/><input type="email" name="email" onChange={handleChange} /></label><br/>
                <label>Available Volunteer Hours per Week:<br/><input name="available_hours" type="number" onChange={handleChange} /></label><br/>
                <label>Resume:<br/><input type="file" name="resume" onChange={handleFileChange} /></label><br/>
                <label><input type="checkbox" name="criminal_check" onChange={handleChange} /> I confirm I passed a criminal background check.</label><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default VolunteerRegister;
