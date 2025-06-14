import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../services/auth";

const NGODashboard: React.FC = () => {
    const [volunteers, setVolunteers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/volunteers/", {
                headers: getAuthHeaders(),
            })
            .then((res) => {
                setVolunteers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch volunteers:", err);
                setLoading(false);
            });
    }, []);

    const filtered = volunteers.filter(
        (v) =>
            v.user.username.toLowerCase().includes(query.toLowerCase()) ||
            v.contact_email?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div style={{ padding: "2rem" }}>
            <h1>NGO Dashboard</h1>
            <p>Welcome! Browse verified volunteers and reach out for cybersecurity help.</p>

            <input
                type="text"
                placeholder="Search volunteers by username or contact email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: "0.5rem", margin: "1rem 0", width: "100%" }}
            />

            {loading ? (
                <p>Loading volunteers...</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ borderBottom: "2px solid #ccc" }}>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>Username</th>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>Contact Email</th>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>Hours/Week</th>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>Resume</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((v) => (
                        <tr key={v.id} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "0.5rem" }}>{v.user.username}</td>
                            <td style={{ padding: "0.5rem" }}>{v.contact_email}</td>
                            <td style={{ padding: "0.5rem" }}>{v.available_hours}</td>
                            <td style={{ padding: "0.5rem" }}>
                                {v.resume ? (
                                    <a
                                        href={`http://127.0.0.1:8000${v.resume}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#2563eb", textDecoration: "underline" }}
                                    >
                                        View Resume
                                    </a>
                                ) : (
                                    <span style={{ color: "gray" }}>No resume</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default NGODashboard;
