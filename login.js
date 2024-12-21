import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send login data to backend
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            const { token, role } = response.data;
            localStorage.setItem('authToken', token); // Store token in local storage

            // Redirect based on role
            if (role === 'admin') {
                navigate('/admin');
            } else if (role === 'user') {
                navigate('/user');
            }
        } catch (err) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ padding: '10px', marginBottom: '10px', width: '200px' }}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '10px', marginBottom: '10px', width: '200px' }}
                        required
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
