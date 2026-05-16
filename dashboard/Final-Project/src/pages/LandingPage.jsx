import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Container, Grid, 
  Card, CardContent, CardMedia, Box, IconButton, Tabs, Tab, Paper, Stack, Tooltip 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

const LandingPage = () => {
    const [dbMenu, setDbMenu] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);

    const categories = ["Silog Meals", "Sisig & Solo Meals", "Solo Orders", "Beverages"];

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/menu');
                setDbMenu(res.data);
            } catch (err) {
                console.error("Error fetching database menu items:", err);
            }
        };
        fetchMenu();
    }, []);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const activeCategory = categories[currentTab];
    const filteredItems = dbMenu.filter(item => item.category === activeCategory);

    return (
        <Box sx={{ width: '100%', overflowX: 'hidden', bgcolor: '#fffdfa' }}>
            {/* 1. PROFESSIONAL NAVBAR */}
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#4e342e', borderBottom: '2px solid #bf360c' }}>
                <Toolbar sx={{ px: 4, py: 1.5, display: 'flex', justifyContent: 'space-between', minHeight: '95px' }}>
                    
                    {/* Brand Identity Stack */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box 
                            component="img"
                            src="/KuyaTabs Logo.jpg" 
                            alt="KuyaTabs Tapsihan Logo"
                            sx={{ 
                                height: 65, 
                                width: 65,  
                                borderRadius: '50%', 
                                objectFit: 'cover',
                                border: '2px solid #bf360c',
                                boxShadow: '0px 2px 8px rgba(0,0,0,0.2)'
                            }}
                        />
                        <Typography variant="h4" sx={{ 
                            fontFamily: "'Oswald', sans-serif", 
                            fontWeight: 700, 
                            letterSpacing: '1px', 
                            color: '#fff', 
                            textTransform: 'uppercase',
                            fontSize: { xs: '1.4rem', md: '1.7rem' },
                            lineHeight: 1,
                            mt: 0.8,
                            display: 'inline-flex',
                            alignItems: 'center'
                        }}>
                            KuyaTabs Tapsihan
                        </Typography>
                    </Stack>

                    {/* Navigation Actions Stack */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button color="inherit" href="#about" sx={{ fontFamily: "'Montserrat', sans-serif" }}>About</Button>
                        <Button color="inherit" href="#menu" sx={{ fontFamily: "'Montserrat', sans-serif" }}>Menu</Button>
                        <Button color="inherit" href="#location" sx={{ fontFamily: "'Montserrat', sans-serif" }}>Location</Button>
                        <Button color="inherit" href="/auth" sx={{ fontFamily: "'Montserrat', sans-serif" }}>Admin Login</Button>
                        <Button variant="contained" color="primary" href="#menu" sx={{ 
                            fontFamily: "'Montserrat', sans-serif", 
                            fontWeight: 600,
                            borderRadius: '20px',
                            bgcolor: '#bf360c',
                            px: 3,
                            height: '42px',
                            '&:hover': { bgcolor: '#4e342e' }
                        }}>
                            View Menu
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* 2. ELEGANT HERO SECTION */}
            <Box sx={{ 
                bgcolor: '#bf360c', 
                color: 'white', 
                py: 12, 
                textAlign: 'center', 
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath fill=\'%23ffffff\' d=\'M0 0h100v100H0z\'/%3E%3Cpath d=\'M20 50 L50 20 L80 50 Z\' fill=\'%23a1a1a1\' opacity=\'0.2\'/%3E%3C/svg%3E") repeat'
                }} />
                
                <Typography variant="h1" sx={{ 
                    fontFamily: "'Merriweather', serif", 
                    fontWeight: 700, 
                    mb: 1, 
                    position: 'relative',
                    letterSpacing: '-1px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    fontSize: { xs: '2.5rem', md: '4rem' }
                }}>
                    A Taste of Local<br/>Nueva Vizcaya Love
                </Typography>
                <Typography variant="h5" sx={{ 
                    fontFamily: "'Montserrat', sans-serif", 
                    mt: 2, 
                    position: 'relative', 
                    opacity: 0.9, 
                    fontWeight: 400 
                }}>
                    Your elegant, all-day destination for authentic Filipino comforts.
                </Typography>
            </Box>

            {/* 3. CURATED ABOUT SECTION */}
            <Container id="about" maxWidth={false} sx={{ py: 10, px: 6, bgcolor: '#fffdfa' }}>
                <Box sx={{ width: 'fit-content', mx: 'auto', textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ 
                        fontFamily: "'Merriweather', serif", 
                        fontWeight: 700, 
                        color: '#3e2723',
                        display: 'inline-block'
                    }}>
                        Our Story
                    </Typography>
                    <Box sx={{ width: '100%', height: '3px', bgcolor: '#bf360c', mt: 1 }} />
                </Box>
                
                <Typography variant="body1" align="center" sx={{ 
                    maxWidth: 900, 
                    mx: 'auto', 
                    color: '#6b6375', 
                    fontFamily: "'Montserrat', sans-serif", 
                    fontSize: '1.15rem', 
                    lineHeight: '2',
                    fontStyle: 'italic'
                }}>
                    KuyaTabs Tapsihan was founded with a deep respect for local flavors and the goal 
                    to provide affordable, yet refined meals to the people of Nueva Vizcaya. 
                    From our cherished secret tapsi marinade to our signature smoky fried rice, 
                    every dish is served with local love, offering you a culinary journey to the 
                    heart of traditional Filipino comforts.
                </Typography>
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <RestaurantMenuIcon sx={{ color: '#bf360c', fontSize: '3rem', opacity: 0.5 }} />
                </Box>
            </Container>

            {/* 4. PROFESSIONAL MENU SECTION */}
            <Box id="menu" sx={{ bgcolor: '#f4f3ec', py: 10 }}>
                <Container maxWidth={false} sx={{ px: 6 }}>
                    <Typography variant="h4" align="center" sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, color: '#3e2723' }}>
                        Curated Menu
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ fontFamily: "'Montserrat', sans-serif", mt: 1, mb: 5, color: '#6b6375' }}>
                        Hand-selected delicacies prepared with fresh local ingredients
                    </Typography>

                    {/* Styled Category Tabs */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                        <Paper elevation={0} sx={{ bgcolor: '#ffffff', borderRadius: '30px', border: '1px solid #ddd', p: 0.5 }}>
                            <Tabs 
                                value={currentTab} 
                                onChange={handleTabChange} 
                                textColor="primary"
                                indicatorColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                sx={{ 
                                    '.MuiTabs-indicator': { bgcolor: '#bf360c', height: '3px', borderRadius: '3px' },
                                    '.MuiTab-root': { 
                                        fontFamily: "'Montserrat', sans-serif", 
                                        fontWeight: 600, 
                                        color: '#3e2723', 
                                        borderRadius: '25px',
                                        px: 3,
                                        '&.Mui-selected': { color: '#bf360c' } 
                                    }
                                }}
                            >
                                {categories.map((cat, index) => (
                                    <Tab key={index} label={cat} />
                                ))}
                            </Tabs>
                        </Paper>
                    </Box>

                    {/* Card Grid */}
                    <Grid container spacing={4}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                                    <Card elevation={2} sx={{ 
                                        borderRadius: '8px', 
                                        height: '100%', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        border: '1px solid #ddd',
                                        borderTop: '5px solid #bf360c',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: 'rgba(191, 54, 12, 0.2) 0 10px 20px -3px'
                                        }
                                    }}>
                                        <CardMedia
                                            component="img"
                                            height="230"
                                            image={item.photo ? `http://localhost:5000/uploads/${item.photo}` : 'https://via.placeholder.com/250x230?text=KUYATABS+TAPSIHAN'}
                                            alt={item.name}
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, color: '#3e2723' }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", color: '#6b6375', mt: 1 }}>
                                                    {item.description}
                                                </Typography>
                                            </Box>
                                            <Typography variant="h6" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, mt: 3, color: '#bf360c' }}>
                                                ₱{item.price}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Box sx={{ width: '100%', py: 8, textAlign: 'center' }}>
                                <Typography variant="body1" sx={{ fontFamily: "'Montserrat', sans-serif", color: '#6b6375', fontStyle: 'italic' }}>
                                    Our kitchen is actively refining items in the "{activeCategory}" category. Please check back shortly for these dynamic updates.
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Container>
            </Box>

            {/* 5. LOCALISED LOCATION SECTION */}
            <Container id="location" maxWidth={false} sx={{ py: 10, px: 6 }}>
                <Box sx={{ width: 'fit-content', mx: 'auto', textAlign: 'center', mb: 3 }}>
                    <Typography variant="h4" sx={{ 
                        fontFamily: "'Merriweather', serif", 
                        fontWeight: 700, 
                        color: '#3e2723',
                        display: 'inline-block'
                    }}>
                        Find Us In Nueva Vizcaya
                    </Typography>
                    <Box sx={{ width: '100%', height: '3px', bgcolor: '#bf360c', mt: 1 }} />
                </Box>
                
                {/* Fully Stacked and Centered Marker Layout */}
                <Stack 
                    direction="column" 
                    spacing={1.5} 
                    justifyContent="center" 
                    alignItems="center" 
                    sx={{ maxWidth: '850px', mx: 'auto' }}
                >
                    <LocationOnIcon sx={{ color: '#bf360c', fontSize: '2.5rem' }} />
                    <Typography variant="body1" align="center" sx={{ 
                        fontFamily: "'Montserrat', sans-serif", 
                        color: '#6b6375', 
                        fontSize: '1.15rem',
                        lineHeight: '1.6'
                    }}>
                        Located in the heartwarming landscapes of Nueva Vizcaya. Come visit us for friendly service and a truly local meal.
                    </Typography>
                </Stack>
            </Container>

            {/* 6. FIXED CRITICAL CENTERED FOOTER ARCHITECTURE */}
            <Box sx={{ bgcolor: '#4e342e', color: 'white', py: 6, textAlign: 'center', width: '100%' }}>
                <Typography variant="h6" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: '#fff', mb: 2 }}>
                    Connect With Us
                </Typography>
                
                {/* Fixed: Clean, absolute centering layouts bypassing inner-row stack distortions */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2.5 }}>
                    <Tooltip title="Visit our Facebook Page" arrow>
                        <IconButton 
                            color="inherit" 
                            component="a" 
                            href="https://www.facebook.com/p/Kuya-TABS-tapsihan-100063611029645/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            sx={{ 
                                '&:hover': { color: '#3b5998', bgcolor: 'rgba(255,255,255,0.1)' },
                                border: '1px solid rgba(255,255,255,0.2)',
                                p: 1.5
                            }}
                        >
                            <FacebookIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Fixed: Bulletproof Row Centering Block */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mb: 4 }}>
                    <PhoneIcon sx={{ color: '#bf360c' }} />
                    <Typography variant="body1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '1.15rem', color: '#fff' }}>
                        0935 733 4640
                    </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", opacity: 0.8, fontSize: '0.85rem' }}>
                    © 2026 KuyaTabs Tapsihan. All Rights Reserved. Solano, Nueva Vizcaya Branch.
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;