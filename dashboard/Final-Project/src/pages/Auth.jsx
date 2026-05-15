import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [mode, setMode] = useState('login'); // 'login' or 'forgot'
    const [form, setForm] = useState({ username: '', password: '', newPassword: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'login') {
                const res = await axios.post(`http://localhost:5000/login`, form);
                if (res.data.success) {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('userRole', res.data.role);
                    localStorage.setItem('userName', res.data.username);
                    navigate('/dashboard');
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
            alert(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '100px' }}>
            <Paper elevation={3} style={{ padding: '20px', borderTop: '4px solid #e65100' }}>
                <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 700 }}>
                    {mode === 'login' ? "Staff Sign In" : "Reset Password"}
                </Typography>
                <Typography variant="body2" align="center" sx={{ mb: 2, color: 'text.secondary' }}>
                    KuyaTabs Tapsihan - Internal Access Only
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth label="Username" margin="normal" required
                        value={form.username}
                        onChange={(e) => setForm({...form, username: e.target.value})} 
                    />
                    
                    {mode === 'login' && (
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

                    <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2, py: 1.5 }}>
                        {mode === 'login' ? "Login to Dashboard" : "Update Password"}
                    </Button>
                </form>

                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    {mode === 'login' ? (
                        <Button size="small" onClick={() => setMode('forgot')}>Forgot Password?</Button>
                    ) : (
                        <Button size="small" onClick={() => setMode('login')}>Back to Login</Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default Auth;