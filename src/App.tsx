import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import AdminDashboard from './pages/AdminDashboard';
import NGODashboard from './pages/NGODashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import Home from './pages/Home';
import VolunteerRegister from './pages/VolunteerRegister';
import NGORegister from './pages/NGORegister';
import BrowseVolunteers from './pages/BrowseVolunteers';
import BrowseNGOs from './pages/BrowseNGOs';
import MessageBoard from './pages/MessageBoard';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/register/volunteer" element={<VolunteerRegister />} />
                <Route path="/register/ngo" element={<NGORegister />} />
                <Route path="/" element={<Home />} />
                <Route path="/messages" element={<MessageBoard />} />
                <Route path="/volunteers" element={<BrowseVolunteers />} />
                <Route path="/ngos" element={<BrowseNGOs />} />
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute role="admin">
                            <Users />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ngo/dashboard"
                    element={
                        <ProtectedRoute role="ngo">
                            <NGODashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/volunteer/dashboard"
                    element={
                        <ProtectedRoute role="volunteer">
                            <VolunteerDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
