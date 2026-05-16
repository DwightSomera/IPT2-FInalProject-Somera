import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, Box, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

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
            alert(err.response?.data?.message || "Login failed. Please verify your internal staff credentials.");
        }
    };

    return (
        /* STRETCHED LAYOUT: Fill screen but center content Paper */
        <Container maxWidth={false} sx={{ 
            bgcolor: '#fffdfa', 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            p: 0, m: 0
        }}>
            <Paper elevation={4} sx={{ 
                padding: '30px', 
                borderTop: '5px solid #bf360c', 
                width: '100%', 
                maxWidth: '420px', 
                borderRadius: '8px',
                bgcolor: '#ffffff'
            }}>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
                    <RestaurantMenuIcon sx={{ color: '#bf360c', opacity: 0.6 }}/>
                    <Typography variant="h5" align="center" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: 'uppercase', color: '#bf360c' }}>
                        Internal Access
                    </Typography>
                </Stack>
                <Typography variant="body2" align="center" sx={{ fontFamily: "'Montserrat', sans-serif", mb: 2, color: '#6b6375', fontWeight: 500 }}>
                    KuyaTabs Tapsihan Portal - Log in below.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField 
                        fullWidth label="Username" margin="normal" required
                        value={form.username}
                        onChange={(e) => setForm({...form, username: e.target.value})} 
                        sx={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                    
                    {mode === 'login' && (
                        <TextField 
                            fullWidth label="Password" type="password" margin="normal" required
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})} 
                            sx={{ fontFamily: "'Montserrat', sans-serif" }}
                        />
                    )}

                    {mode === 'forgot' && (
                        <TextField 
                            fullWidth label="New Access Key" type="password" margin="normal" required
                            value={form.newPassword}
                            onChange={(e) => setForm({...form, newPassword: e.target.value})} 
                            sx={{ fontFamily: "'Montserrat', sans-serif" }}
                        />
                    )}

                    <Button fullWidth variant="contained" type="submit" sx={{ 
                        mt: 3, py: 1.8, 
                        fontFamily: "'Montserrat', sans-serif", 
                        fontWeight: 600, 
                        bgcolor: '#4e342e',
                        borderRadius: '4px',
                        '&:hover': { bgcolor: '#bf360c' }
                    }}>
                        {mode === 'login' ? "Secure Staff Login" : "Update Credentials"}
                    </Button>
                </form>

                <Box sx={{ mt: 3, textAlign: 'center', borderTop: '1px solid #ddd', pt: 2 }}>
                    {mode === 'login' ? (
                        <Button size="small" onClick={() => setMode('forgot')} sx={{ color: '#6b6375', fontFamily: "'Montserrat', sans-serif" }}>Forgot Access Key?</Button>
                    ) : (
                        <Button size="small" onClick={() => setMode('login')} sx={{ color: '#6b6375', fontFamily: "'Montserrat', sans-serif" }}>Back to Staff Sign In</Button>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default Auth;