import React, { useState } from 'react';
import { Box, Tabs, Tab, Button, AppBar, Toolbar, Typography, Stack, Container } from '@mui/material';
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
            {/* PROFESSIONAL ADMIN NAVBAR - Stretched */}
            <AppBar position="static" elevation={0} sx={{ bgcolor: '#bf360c' }}>
                <Toolbar sx={{ px: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <RestaurantMenuIcon sx={{ color: '#fff', opacity: 0.8 }}/>
                        <Typography variant="h6" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>
                            KUYATABS | MANAGEMENT
                        </Typography>
                    </Stack>
                    
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: '8px 15px', borderRadius: '20px' }}>
                            <PersonIcon sx={{ color: '#fff' }}/>
                            <Typography sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: '#fff' }}>
                                Welcome, {userName}! ({role})
                            </Typography>
                        </Stack>
                        <Button color="inherit" onClick={handleLogout} sx={{ fontFamily: "'Montserrat', sans-serif" }}>Logout</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            
            {/* MANAGEMENT TABS SELECTOR - Centered Style */}
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

            {/* TAB CONTENT PANEL - Applied previous stretching logic */}
            <Box maxWidth={false} sx={{ mt: 0 }}>
                {value === 0 && <MenuManagement />}
                {value === 1 && role === 'admin' && <UserManagement />}
            </Box>
        </Box>
    );
};

export default Dashboard;