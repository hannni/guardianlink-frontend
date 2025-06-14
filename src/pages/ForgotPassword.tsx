import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleMailTo = () => {
        const adminEmail = "admin@guardianlink.org"; // your actual admin address
        const subject = encodeURIComponent("Reset Password Request");
        const body = encodeURIComponent(
            `Hello Admin,\n\nI would like to request a password reset for the account associated with: ${email}.\n\nThank you.`
        );
        const mailtoLink = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    };

    return (
        <div style={{ maxWidth: 400, margin: "80px auto", textAlign: "center" }}>
            <h2>Forgot Password</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    marginBottom: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={handleMailTo}
                style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                Request Reset
            </button>
        </div>
    );
};

export default ForgotPassword;
