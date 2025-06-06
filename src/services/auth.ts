import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/token/`, {
            username,
            password,
        });
        const { access, refresh, role } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('userRole', role);
        return true;
    } catch (error) {
        console.error('Login failed:', error);
        return false;
    }
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
};

export function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}