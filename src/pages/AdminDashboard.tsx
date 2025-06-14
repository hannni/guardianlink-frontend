import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthHeaders } from "../services/auth";
import "../components/Navbar.css"; // optional if you want styling

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
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
    };

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

    const handleAssignRole = async (userId: number) => {
        const newRole = prompt("Enter new role (admin, ngo, volunteer):")?.toLowerCase();
        if (!newRole || !["admin", "ngo", "volunteer"].includes(newRole)) {
            alert("Invalid role.");
            return;
        }

        try {
            await axios.post(
                `http://127.0.0.1:8000/api/users/${userId}/assign-role/`,
                { role: newRole },
                { headers: getAuthHeaders() }
            );
            alert(`Role updated to ${newRole}`);
            fetchUsers();
        } catch (err) {
            console.error("Role assignment failed:", err);
        }
    };

    const handleResetPassword = async (userId: number) => {
        try {
            await axios.post(
                `http://127.0.0.1:8000/api/users/${userId}/reset-password/`,
                {},
                { headers: getAuthHeaders() }
            );
            alert("Password has been reset to: resetedpassword");
        } catch (err) {
            console.error("Password reset failed:", err);
        }
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

            {/* Create Buttons */}
            <div style={{ margin: "1rem 0" }}>
                <button
                    onClick={() => navigate("/register/ngo")}
                    style={{
                        marginRight: "1rem",
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Create New NGO
                </button>
                <button
                    onClick={() => navigate("/register/volunteer")}
                    style={{
                        backgroundColor: "#10b981",
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Create New Volunteer
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by name or email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: "0.5rem", margin: "1rem 0", width: "100%" }}
            />

            {/* User Table */}
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
                            <td style={{ padding: "0.5rem", textTransform: "capitalize" }}>{user.role}</td>
                            <td style={{ padding: "0.5rem" }}>
                                {user.is_superuser ? (
                                    <span style={{ color: "gray", fontStyle: "italic" }}>Protected</span>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleAssignRole(user.id)}
                                            style={{
                                                marginRight: "0.5rem",
                                                backgroundColor: "#f59e0b",
                                                color: "white",
                                                border: "none",
                                                padding: "0.4rem 0.8rem",
                                                cursor: "pointer",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            Assign Role
                                        </button>
                                        <button
                                            onClick={() => handleResetPassword(user.id)}
                                            style={{
                                                marginRight: "0.5rem",
                                                backgroundColor: "#0ea5e9",
                                                color: "white",
                                                border: "none",
                                                padding: "0.4rem 0.8rem",
                                                cursor: "pointer",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            Reset Password
                                        </button>
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
                                    </>
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
