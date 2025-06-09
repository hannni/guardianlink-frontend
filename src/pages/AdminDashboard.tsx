import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../services/auth";
import "../components/Navbar.css"; // optional if you want styling

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/users/", { headers: getAuthHeaders() })
            .then((res) => {
                console.log("Fetched users:", res.data);
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch users:", err);
                setLoading(false);
            });
    }, []);

    const handleDelete = (userId: number) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios
                .delete(`http://127.0.0.1:8000/api/users/${userId}/`, { headers: getAuthHeaders() })
                .then(() => {
                    setUsers(users.filter((user) => user.id !== userId));
                })
                .catch((err) => console.error("Delete failed:", err));
        }
    };

    const handleRoleChange = (userId: number, newRole: string) => {
        axios
            .patch(
                `/api/users/${userId}/`,
                { role: newRole },
                { headers: getAuthHeaders() }
            )
            .then(() => {
                setUsers(
                    users.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
                );
            })
            .catch((err) => console.error("Role change failed:", err));
    };

    const filteredUsers = users.filter(
        (u) =>
            u.username.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Admin Dashboard</h1>
            <p>Manage platform users: view, delete, or change their role.</p>

            <input
                type="text"
                placeholder="Search by name or email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: "0.5rem", margin: "1rem 0", width: "100%" }}
            />

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ borderBottom: "2px solid #ccc" }}>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>Username</th>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>Email</th>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>Role</th>
                        <th style={{ textAlign: "left", padding: "0.5rem" }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "0.5rem" }}>{user.username}</td>
                            <td style={{ padding: "0.5rem" }}>{user.email}</td>
                            <td style={{ padding: "0.5rem", textTransform: "capitalize" }}>
                                {user.role}
                            </td>
                            <td style={{ padding: "0.5rem" }}>
                                {user.role !== "admin" ? (
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        style={{
                                            backgroundColor: "#dc2626",
                                            color: "white",
                                            border: "none",
                                            padding: "0.4rem 0.8rem",
                                            cursor: "pointer",
                                            borderRadius: "4px",
                                        }}
                                    >
                                        Delete
                                    </button>
                                ) : (
                                    <span style={{ color: "gray", fontStyle: "italic" }}>Protected</span>
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

export default AdminDashboard;
