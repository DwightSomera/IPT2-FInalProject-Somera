/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, Box, Stack, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Auth = () => {
    const [mode, setMode] = useState('login'); 
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
            alert(err.response?.data?.message || "Login failed. Please verify credentials.");
        }
    };

    return (
        <Box sx={{ 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
            // DESIGN: Lively background with a food-theme gradient
            background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            
            {/* BACK BUTTON: Floating at the top-left */}
            <Tooltip title="Return to Home Page">
                <Button
                    onClick={() => navigate('/')}
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        position: 'absolute',
                        top: 30,
                        left: 30,
                        color: '#fff',
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(5px)',
                        px: 3,
                        py: 1,
                        borderRadius: '30px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        '&:hover': { bgcolor: '#bf360c', borderColor: '#bf360c' }
                    }}
                >
                    Back to Website
                </Button>
            </Tooltip>

            {/* LOGIN CARD */}
            <Paper elevation={10} sx={{ 
                padding: '40px', 
                borderTop: '6px solid #bf360c', 
                width: '100%', 
                maxWidth: '400px', 
                borderRadius: '16px',
                bgcolor: 'rgba(255, 255, 255, 0.95)', // Slight transparency for a modern look
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
            }}>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
                    <Box 
                        component="img"
                        src="/KuyaTabs Logo.jpg" 
                        alt="Logo"
                        sx={{ height: 50, width: 50, borderRadius: '50%', border: '2px solid #bf360c' }} 
                    />
                    <Typography variant="h5" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: 'uppercase', color: '#bf360c' }}>
                        Staff Portal
                    </Typography>
                </Stack>
                
                <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", mb: 4, color: '#4e342e', fontWeight: 500 }}>
                    Internal Access Only
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth label="Username" margin="normal" required
                        value={form.username}
                        onChange={(e) => setForm({...form, username: e.target.value})} 
                        variant="outlined"
                    />
                    
                    {mode === 'login' && (
                        <TextField 
                            fullWidth label="Password" type="password" margin="normal" required
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})} 
                            variant="outlined"
                        />
                    )}

                    {mode === 'forgot' && (
                        <TextField 
                            fullWidth label="New Access Key" type="password" margin="normal" required
                            value={form.newPassword}
                            onChange={(e) => setForm({...form, newPassword: e.target.value})} 
                            variant="outlined"
                        />
                    )}

                    <Button fullWidth variant="contained" type="submit" sx={{ 
                        mt: 4, py: 1.8, 
                        fontFamily: "'Montserrat', sans-serif", 
                        fontWeight: 700, 
                        bgcolor: '#4e342e',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        '&:hover': { bgcolor: '#bf360c' }
                    }}>
                        {mode === 'login' ? "Login to Dashboard" : "Reset Credentials"}
                    </Button>
                </form>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    {mode === 'login' ? (
                        <Button size="small" onClick={() => setMode('forgot')} sx={{ color: '#6b6375', textTransform: 'none', fontWeight: 600 }}>
                            Forgot Access Key?
                        </Button>
                    ) : (
                        <Button size="small" onClick={() => setMode('login')} sx={{ color: '#6b6375', textTransform: 'none', fontWeight: 600 }}>
                            Return to Login
                        </Button>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default Auth;