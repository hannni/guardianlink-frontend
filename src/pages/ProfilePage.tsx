import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../services/auth';

const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [form, setForm] = useState<any>({
        first_name: '',
        last_name: '',
        email: '',
        public_email: '',
        organization_name: '',
        new_password: '',
        confirm_password: '',
    });

    const role = localStorage.getItem('userRole');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/profile/', { headers: getAuthHeaders() })
            .then(res => {
                const data = res.data;
                setProfile(data);
                setForm({
                    first_name: data.user?.first_name || '',
                    last_name: data.user?.last_name || '',
                    email: data.user?.email || '',
                    public_email: data.poc_email || data.contact_email || '',
                    organization_name: data.organization_name || '',
                    new_password: '',
                    confirm_password: '',
                });
            })
            .catch(err => console.error("Profile load error", err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleUpdate = async () => {
        const payload: any = {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
        };

        if (role === 'ngo') {
            payload.poc_email = form.public_email;
            payload.organization_name = form.organization_name;
        }

        if (role === 'volunteer') {
            payload.contact_email = form.public_email;
        }

        try {
            await axios.patch('http://127.0.0.1:8000/api/profile/update/', payload, { headers: getAuthHeaders() });
            alert('Profile updated successfully');
        } catch (err) {
            console.error(err);
            alert('Update failed');
        }
    };

    const handleChangePassword = async () => {
        if (!form.new_password || !form.confirm_password) {
            alert("Please fill in both password fields.");
            return;
        }

        if (form.new_password !== form.confirm_password) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/change_password/', {
                password: form.new_password,
            }, { headers: getAuthHeaders() });

            alert('Password changed!');
            setForm({ ...form, new_password: '', confirm_password: '' });
        } catch (err) {
            alert('Password change failed');
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) return;
        try {
            await axios.delete('http://127.0.0.1:8000/api/delete_account/', { headers: getAuthHeaders() });
            localStorage.clear();
            window.location.href = '/';
        } catch (err) {
            alert('Failed to delete account');
        }
    };

    if (!profile) return <p>Loading...</p>;

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
            <h2>My Profile</h2>
            <p>If you have a single name, enter it in the Last Name field and XXX in the First Name.</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ flex: '1 1 45%' }}>
                    <label>First Name *<br />
                        <input name="first_name" value={form.first_name} onChange={handleChange} style={{ width: '100%' }} />
                    </label><br /><br />
                </div>

                <div style={{ flex: '1 1 45%' }}>
                    <label>Last Name *<br />
                        <input name="last_name" value={form.last_name} onChange={handleChange} style={{ width: '100%' }} />
                    </label><br /><br />
                </div>
            </div>

            <label>Email (Login Email)<br />
                <input name="email" value={form.email} onChange={handleChange} style={{ width: '100%' }} />
            </label><br /><br />

            {role === 'ngo' && (
                <>
                    <label>Organization Name<br />
                        <input name="organization_name" value={form.organization_name} onChange={handleChange} style={{ width: '100%' }} />
                    </label><br /><br />
                    <label>Public Contact Email<br />
                        <input name="public_email" value={form.public_email} onChange={handleChange} style={{ width: '100%' }} />
                    </label><br /><br />
                </>
            )}

            {role === 'volunteer' && (
                <label>Public Contact Email<br />
                    <input name="public_email" value={form.public_email} onChange={handleChange} style={{ width: '100%' }} />
                </label>
            )}<br /><br />

            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                <button onClick={handleUpdate}>Update Profile</button>
            </div>

            <hr style={{ margin: '2rem 0' }} />

            <h3>Change Password</h3>

            <label>New Password<br />
                <input
                    type="password"
                    name="new_password"
                    value={form.new_password}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                />
            </label><br /><br />

            <label>Confirm New Password<br />
                <input
                    type="password"
                    name="confirm_password"
                    value={form.confirm_password}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                />
            </label><br /><br />

            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleChangePassword}>Change Password</button>
                <button onClick={handleDeleteAccount} style={{ color: 'red' }}>Delete My Account</button>
            </div>
        </div>
    );
};

export default ProfilePage;
