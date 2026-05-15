import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [mode, setMode] = useState('login'); // 'login', 'signup', or 'forgot'
    const [form, setForm] = useState({ username: '', password: '', newPassword: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'login' || mode === 'signup') {
                const endpoint = mode === 'login' ? '/login' : '/register';
                const res = await axios.post(`http://localhost:5000${endpoint}`, form);
                
                if (mode === 'login' && res.data.success) {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('userRole', res.data.role);
                    localStorage.setItem('userName', res.data.username);
                    navigate('/dashboard');
                } else {
                    alert(res.data.message || "Success! Please login.");
                    setMode('login');
                }
            } else if (mode === 'forgot') {
                const res = await axios.post(`http://localhost:5000/reset-password`, {
                    username: form.username,
                    newPassword: form.newPassword
                });
                alert(res.data.message);
                setMode('login');
            }
        } catch (err) {
            alert(err.response?.data?.message || "Authentication failed");
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '100px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    {mode === 'login' && "Sign In - KuyaTabs"}
                    {mode === 'signup' && "Sign Up - KuyaTabs"}
                    {mode === 'forgot' && "Reset Password"}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth label="Username" margin="normal" required
                        value={form.username}
                        onChange={(e) => setForm({...form, username: e.target.value})} 
                    />
                    
                    {mode !== 'forgot' && (
                        <TextField 
                            fullWidth label="Password" type="password" margin="normal" required
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})} 
                        />
                    )}

                    {mode === 'forgot' && (
                        <TextField 
                            fullWidth label="New Password" type="password" margin="normal" required
                            value={form.newPassword}
                            onChange={(e) => setForm({...form, newPassword: e.target.value})} 
                        />
                    )}

                    <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                        {mode === 'login' && "Login"}
                        {mode === 'signup' && "Register"}
                        {mode === 'forgot' && "Update Password"}
                    </Button>
                </form>

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    {mode === 'login' ? (
                        <>
                            <Button size="small" onClick={() => setMode('signup')}>Need an account? Sign Up</Button>
                            <Button size="small" onClick={() => setMode('forgot')}>Forgot Password?</Button>
                        </>
                    ) : (
                        <Button size="small" onClick={() => setMode('login')}>Back to Login</Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default Auth;