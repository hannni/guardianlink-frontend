// NGORegister.tsx
import React, { useState } from 'react';

const NGORegister: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
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
        formData.append('user.email', form.poc_email);  // for user.email
        formData.append('user.role', 'ngo');

        // OrganizationProfile fields
        formData.append('organization_name', form.organization_name);
        formData.append('poc_email', form.poc_email); // now clearly labeled
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
        <div>
            <h2><b>NGO / Organization Registration</b></h2>
            <form onSubmit={handleSubmit}>
                <label>Username (Login ID):<br /><input name="username" onChange={handleChange} /></label><br />
                <label>Password (Login Password):<br /><input type="password" name="password" onChange={handleChange} /></label><br />
                <label>First Name:<br /><input name="first_name" onChange={handleChange} /></label><br />
                <label>Last Name:<br /><input name="last_name" onChange={handleChange} /></label><br />
                <label>Point of Contact Email Address:<br /><input name="poc_email" onChange={handleChange} /></label><br />
                <label>Organization Name:<br /><input name="organization_name" onChange={handleChange} /></label><br />
                <label>Areas of Concern:<br /><textarea name="areas_of_concern" onChange={handleChange} /></label><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NGORegister;
