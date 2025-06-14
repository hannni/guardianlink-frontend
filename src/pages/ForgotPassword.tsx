import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div style={{ maxWidth: 400, margin: '80px auto', textAlign: 'center' }}>
            <h2>Forgot Password</h2>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            marginBottom: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Request Reset
                    </button>
                </form>
            ) : (
                <div style={{ marginTop: '20px' }}>
                    <p style={{ color: 'green' }}>
                        If your email exists in our system, please contact the admin at <strong>admin@guardianlink.org</strong> to reset your password.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
