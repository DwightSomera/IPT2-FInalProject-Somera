import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Container, Grid, 
  Card, CardContent, CardMedia, Box, IconButton 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import axios from 'axios';

const LandingPage = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            const res = await axios.get('http://localhost:5000/api/menu');
            setMenu(res.data);
        };
        fetchMenu();
    }, []);

    return (
        <Box>
            {/* Navigation Bar */}
            <AppBar position="sticky" sx={{ backgroundColor: '#ff9800' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>KuyaTabs Tapsihan</Typography>
                    <Button color="inherit" href="#about">About</Button>
                    <Button color="inherit" href="#menu">Menu</Button>
                    <Button color="inherit" href="#location">Location</Button>
                    <Button color="inherit" href="/auth">Admin Login</Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box sx={{ bgcolor: '#f5f5f5', py: 10, textAlign: 'center' }}>
                <Typography variant="h2" fontWeight="bold">Best Tapsi in Nueva Vizcaya</Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>Home of the authentic local flavors.</Typography>
            </Box>

            {/* About Section */}
            <Container id="about" sx={{ py: 8 }}>
                <Typography variant="h4" gutterBottom align="center">Our Story</Typography>
                <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: 'auto' }}>
                    KuyaTabs Tapsihan started with a simple goal: to provide affordable and delicious meals
                    to the people of Nueva Vizcaya[cite: 22]. From our secret tapsi marinade to our 
                    signature fried rice, every dish is served with local love.
                </Typography>
            </Container>

            {/* Menu Section (Dynamic) */}
            <Box id="menu" sx={{ bgcolor: '#fff', py: 8 }}>
                <Container>
                    <Typography variant="h4" gutterBottom align="center">Our Menu</Typography>
                    <Grid container spacing={4}>
                        {menu.map((item) => (
                            <Grid item key={item._id} xs={12} sm={6} md={4}>
                                <Card elevation={4}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`http://localhost:5000/uploads/${item.photo}`}
                                        alt={item.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>₱{item.price}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Location Section */}
            <Container id="location" sx={{ py: 8 }}>
                <Typography variant="h4" gutterBottom align="center">Visit Us</Typography>
                <Typography variant="body1" align="center">
                    We are located in the heart of Nueva Vizcaya[cite: 22]. 
                    Come visit us for a warm meal and friendly service!
                </Typography>
            </Container>

            {/* Footer / Social Media */}
            <Box sx={{ bgcolor: '#333', color: 'white', py: 4, textAlign: 'center' }}>
                <Typography variant="h6">Follow Us</Typography>
                <IconButton color="inherit"><FacebookIcon /></IconButton>
                <IconButton color="inherit"><InstagramIcon /></IconButton>
                <Typography variant="body2" sx={{ mt: 2 }}>© 2026 KuyaTabs Tapsihan. All Rights Reserved.</Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;