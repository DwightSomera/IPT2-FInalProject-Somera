import React, { useState } from 'react';
import { Box, Tabs, Tab, Button, AppBar, Toolbar, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import GroupIcon from '@mui/icons-material/Group';
import MenuManagement from '../components/MenuManagement';
import UserManagement from '../components/UserManagement';

const Dashboard = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const role = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/auth');
    };

    return (
        <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#fffdfa' }}>
            {/* PROFESSIONAL ADMIN NAVBAR - Added more vertical space */}
            <AppBar position="static" elevation={0} sx={{ bgcolor: '#bf360c' }}>
                <Toolbar sx={{ 
                    px: 4, 
                    py: 2.5, // INCREASED vertical padding (top and bottom)
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    minHeight: '110px' // INCREASED total height from 95px to 110px
                }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {/* BRAND LOGO */}
                        <Box 
                            component="img"
                            src="/KuyaTabs Logo.jpg" 
                            alt="Logo"
                            sx={{ 
                                height: 60, // Slightly bigger logo to match taller bar
                                width: 60,  
                                borderRadius: '50%', 
                                objectFit: 'cover',
                                border: '2px solid rgba(255,255,255,0.8)',
                                boxShadow: '0px 2px 6px rgba(0,0,0,0.2)'
                            }}
                        />
                        {/* Title Alignment maintained */}
                        <Typography variant="h5" sx={{ 
                            fontFamily: "'Oswald', sans-serif", 
                            fontWeight: 700, 
                            color: '#fff', 
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            lineHeight: 1,
                            mt: 0.8, 
                            display: 'inline-flex',
                            alignItems: 'center'
                        }}>
                            KUYATABS | MANAGEMENT
                        </Typography>
                    </Stack>
                    
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: '10px 20px', borderRadius: '25px' }}>
                            <PersonIcon sx={{ color: '#fff' }}/>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: '#fff' }}>
                                Welcome, {userName}! ({role})
                            </Typography>
                        </Stack>
                        <Button color="inherit" onClick={handleLogout} sx={{ fontFamily: "'Montserrat', sans-serif", ml: 1 }}>Logout</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            
            {/* MANAGEMENT TABS SELECTOR */}
            <Box sx={{ borderBottom: 1, borderColor: '#ddd', bgcolor: '#ffffff', py: 1, display: 'flex', justifyContent: 'center' }}>
                <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} sx={{ 
                    '.MuiTabs-indicator': { bgcolor: '#bf360c', height: '3px' },
                    '.MuiTab-root': { 
                        fontFamily: "'Montserrat', sans-serif", 
                        fontWeight: 600, 
                        color: '#4e342e', 
                        px: 3,
                        '&.Mui-selected': { color: '#bf360c' } 
                    }
                }}>
                    <Tab label="Manage Menu" icon={<RestaurantMenuIcon sx={{ mr: 1 }}/>} iconPosition="start" />
                    {role === 'admin' && <Tab label="Manage Users" icon={<GroupIcon sx={{ mr: 1 }}/>} iconPosition="start" />}
                </Tabs>
            </Box>

            {/* TAB CONTENT PANEL */}
            <Box maxWidth={false} sx={{ mt: 0 }}>
                {value === 0 && <MenuManagement />}
                {value === 1 && role === 'admin' && <UserManagement />}
            </Box>
        </Box>
    );
};

export default Dashboard;