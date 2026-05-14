import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/login' : '/register';
        try {
            const res = await axios.post(`http://localhost:5000${endpoint}`, form);
            if (isLogin && res.data.success) {
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard');
            } else {
                alert(res.data.message || "Success! Please login.");
                setIsLogin(true);
            }
        } catch (err) {
            alert("Authentication failed");
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '100px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" align="center">
                    {isLogin ? "Sign In" : "Sign Up"} - KuyaTabs
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth label="Username" margin="normal" 
                        onChange={(e) => setForm({...form, username: e.target.value})} 
                    />
                    <TextField 
                        fullWidth label="Password" type="password" margin="normal" 
                        onChange={(e) => setForm({...form, password: e.target.value})} 
                    />
                    <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                        {isLogin ? "Login" : "Register"}
                    </Button>
                </form>
                <Button fullWidth onClick={() => setIsLogin(!isLogin)} sx={{ mt: 1 }}>
                    {isLogin ? "Need an account? Sign Up" : "Have an account? Sign In"}
                </Button>
            </Paper>
        </Container>
    );
};

export default Auth;