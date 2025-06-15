import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../services/auth";
import { useNavigate } from "react-router-dom";

const VolunteerVerification: React.FC = () => {
    const [volunteers, setVolunteers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = () => {
        axios
            .get("http://127.0.0.1:8000/api/volunteers/", { headers: getAuthHeaders() })
            .then((res) => {
                setVolunteers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch volunteers:", err);
                setLoading(false);
            });
    };

    const handleCheckboxChange = (volunteerId: number, field: string) => {
        const updatedVolunteers = volunteers.map((volunteer) => {
            if (volunteer.id === volunteerId) {
                volunteer[field] = !volunteer[field];
            }
            return volunteer;
        });
        setVolunteers(updatedVolunteers);
    };

    const handleSaveChanges = (volunteerId: number) => {
        const volunteer = volunteers.find((vol) => vol.id === volunteerId);
        if (volunteer) {
            axios
                .patch(
                    `http://127.0.0.1:8000/api/volunteers/${volunteerId}/verify/`,
                    {
                        criminal_check: volunteer.criminal_check,
                        is_criminal_check_verified: volunteer.is_criminal_check_verified,
                    },
                    { headers: getAuthHeaders() }
                )
                .then(() => {
                    alert("Volunteer status updated!");
                    fetchVolunteers();
                })
                .catch((err) => {
                    console.error("Failed to update volunteer status:", err);
                });
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Volunteer Verification</h1>
            {loading ? (
                <p>Loading volunteers...</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ borderBottom: "2px solid #ccc" }}>
                        <th style={{ padding: "0.5rem" }}>Username</th>
                        <th style={{ padding: "0.5rem" }}>Criminal Check</th>
                        <th style={{ padding: "0.5rem" }}>Verified</th>
                        <th style={{ padding: "0.5rem" }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {volunteers.map((volunteer) => (
                        <tr key={volunteer.id} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "0.5rem" }}>{volunteer.user?.username}</td>
                            <td style={{ padding: "0.5rem" }}>
                                <input
                                    type="checkbox"
                                    checked={volunteer.criminal_check || false}
                                    onChange={() => handleCheckboxChange(volunteer.id, "criminal_check")}
                                />
                            </td>
                            <td style={{ padding: "0.5rem" }}>
                                <input
                                    type="checkbox"
                                    checked={volunteer.is_criminal_check_verified || false}
                                    onChange={() =>
                                        handleCheckboxChange(volunteer.id, "is_criminal_check_verified")
                                    }
                                />
                            </td>
                            <td style={{ padding: "0.5rem" }}>
                                <button
                                    onClick={() => handleSaveChanges(volunteer.id)}
                                    style={{
                                        backgroundColor: "#10b981",
                                        color: "white",
                                        border: "none",
                                        padding: "0.4rem 0.8rem",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Save
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VolunteerVerification;
