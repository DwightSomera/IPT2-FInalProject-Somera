import React, { useState } from 'react';
import { Box, Tabs, Tab, Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
        <Box sx={{ width: '100%' }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        KuyaTabs Admin Panel - Welcome, {userName}!
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} centered>
                    <Tab label="Manage Menu" />
                    {role === 'admin' && <Tab label="Manage Users" />}
                </Tabs>
            </Box>

            {/* STRETCHED: removed px from this Box to let inner containers handle it */}
            <Box sx={{ py: 3 }}>
                {value === 0 && <MenuManagement />}
                {value === 1 && role === 'admin' && <UserManagement />}
            </Box>
        </Box>
    );
};

export default Dashboard;