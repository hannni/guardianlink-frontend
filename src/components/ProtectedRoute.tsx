import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
    role?: string; // Make 'role' optional
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('userRole');

    // Step 1: Check if logged in
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Step 2: If 'role' is passed, check for match
    if (role && userRole !== role) {
        return <Navigate to="/dashboard" replace />;
    }

    // Step 3: If all checks pass
    return <>{children}</>;
};

export default ProtectedRoute;
