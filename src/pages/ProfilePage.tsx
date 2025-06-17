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
        resume: null,
    });

    const role = localStorage.getItem('userRole');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/profile/', { headers: getAuthHeaders() })
            .then(res => {
                const data = res.data;
                setProfile(data);
                setForm({
                    first_name: data.first_name || data.user?.first_name || '',
                    last_name: data.last_name || data.user?.last_name || '',
                    email: data.email || data.user?.email || '',
                    public_email: data.poc_email || data.contact_email || '',
                    organization_name: data.organization_name || '',
                    criminal_check: data.criminal_check || false,
                    is_criminal_check_verified: data.is_criminal_check_verified || false,
                    new_password: '',
                    confirm_password: '',
                });
            })
            .catch(err => console.error("Profile load error", err));
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
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
            payload.contact_email = form.public_email;
            payload.criminal_check = form.criminal_check;
        }

        console.log("PATCH Payload:", payload);

        try {
            await axios.patch('http://127.0.0.1:8000/api/profile/update/', payload, {
                headers: getAuthHeaders(),
            });

            alert('Profile updated successfully');

            // Reload profile and form state
            const refreshed = await axios.get('http://127.0.0.1:8000/api/profile/', {
                headers: getAuthHeaders(),
            });

            setProfile(refreshed.data);
            setForm({
                first_name: refreshed.data.user?.first_name ?? '',
                last_name: refreshed.data.user?.last_name ?? '',
                email: refreshed.data.user?.email ?? '',
                public_email: refreshed.data.poc_email ?? refreshed.data.contact_email ?? '',
                organization_name: refreshed.data.organization_name ?? '',
                new_password: '',
                confirm_password: '',
            });

        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error("Update failed:", err.response?.data || err.message);
                alert('Update failed: ' + (err.response?.data?.detail || err.message));
            } else {
                console.error("Unexpected error:", err);
                alert('An unexpected error occurred.');
            }
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
            <p>Your user information</p>

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

            <label>Email (Main Email)<br />
                <input name="email" value={form.email} onChange={handleChange} style={{ width: '100%' }} />
            </label><br /><br />

            {role === 'admin' && (
                <>
                    <label>Business Email (public)<br />
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </label><br /><br />
                </>
            )}

            {role === 'ngo' && (
                <>
                    <label>Organization Name<br />
                        <input name="organization_name" value={form.organization_name} onChange={handleChange} style={{ width: '100%' }} />
                    </label><br /><br />
                    <label>Contact Email (public)<br />
                        <input name="public_email" value={form.public_email} onChange={handleChange} style={{ width: '100%' }} />
                    </label><br /><br />
                </>
            )}

            {role === 'volunteer' && (
                <>
                    <label>Contact Email (public)<br />
                        <input
                            name="public_email"
                            value={form.public_email}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </label><br /><br />

                    {profile.resume && (
                        <div style={{ marginBottom: '1rem' }}>
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await fetch(`http://127.0.0.1:8000${profile.resume}`, {
                                            method: "HEAD"
                                        });

                                        if (res.ok) {
                                            window.open(`http://127.0.0.1:8000${profile.resume}`, '_blank');
                                        } else {
                                            alert("Resume file not available on server.");
                                        }
                                    } catch (error) {
                                        alert("Unable to check or open resume.");
                                        console.error("Resume fetch error:", error);
                                    }
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'blue',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                Download Current Resume
                            </button>
                        </div>
                    )}


                    <div style={{ marginBottom: '1rem' }}>
                        <label>Upload New Resume:<br />
                            <input
                                type="file"
                                name="resume"
                                onChange={(e) => {
                                    setForm({ ...form, resume: e.target.files?.[0] || null });
                                }}
                            />
                        </label>
                    </div>

                    <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                        <button
                            onClick={async () => {
                                if (!form.resume) {
                                    alert("Please choose a file first.");
                                    return;
                                }

                                const data = new FormData();
                                data.append("resume", form.resume);

                                try {
                                    await axios.patch('http://127.0.0.1:8000/api/profile/upload_resume/', data, {
                                        headers: {
                                            ...getAuthHeaders(),
                                            "Content-Type": "multipart/form-data"
                                        }
                                    });
                                    alert("Resume uploaded successfully");
                                    window.location.reload(); // To update the download link
                                } catch (err) {
                                    console.error(err);
                                    alert("Resume upload failed");
                                }
                            }}
                        >
                            Upload Resume
                        </button>
                        <div style={{ marginBottom: '1rem' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="criminal_check"
                                    checked={form.criminal_check}
                                    onChange={handleChange}
                                />
                                {' '}I confirm I passed a criminal background check
                            </label>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={form.is_criminal_check_verified}
                                    disabled
                                />
                                {' '}Verified by Admin
                            </label>
                        </div>
                    </div>
                </>
            )}



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
