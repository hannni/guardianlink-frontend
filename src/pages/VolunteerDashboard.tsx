import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../services/auth";

const VolunteerDashboard: React.FC = () => {
    const [ngos, setNgos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/ngos/", {
                headers: getAuthHeaders(),
            })
            .then((res) => {
                setNgos(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch NGOs:", err);
                setLoading(false);
            });
    }, []);

    const filtered = ngos.filter(
        (ngo) =>
            ngo.user.username.toLowerCase().includes(query.toLowerCase()) ||
            ngo.poc_email?.toLowerCase().includes(query.toLowerCase()) ||
            ngo.organization_name?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Volunteer Dashboard</h1>
            <p>Welcome! Browse NGOs and offer your help directly.</p>

            <input
                type="text"
                placeholder="Search NGOs by name or POC email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: "0.5rem", margin: "1rem 0", width: "100%" }}
            />

            {loading ? (
                <p>Loading organizations...</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ borderBottom: "2px solid #ccc" }}>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>Organization Name</th>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>POC Email</th>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>Areas of Concern</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((ngo) => (
                        <tr key={ngo.id} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "0.5rem" }}>{ngo.organization_name}</td>
                            <td style={{ padding: "0.5rem" }}>{ngo.poc_email}</td>
                            <td style={{ padding: "0.5rem" }}>{ngo.areas_of_concern}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VolunteerDashboard;
