/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Container, Grid, 
  Card, CardContent, CardMedia, Box, IconButton, Tabs, Tab, Paper, Stack, Tooltip,
  Fab, Zoom 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';

const LandingPage = () => {
    const [dbMenu, setDbMenu] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [showScroll, setShowScroll] = useState(false);

    // Scroll Logic
    useEffect(() => {
        const checkScroll = () => {
            if (!showScroll && window.pageYOffset > 400) {
                setShowScroll(true);
            } else if (showScroll && window.pageYOffset <= 400) {
                setShowScroll(false);
            }
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [showScroll]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
        <Box sx={{ 
            width: '100%', 
            overflowX: 'hidden', 
            backgroundImage: `linear-gradient(rgba(255, 253, 250, 0.92), rgba(255, 253, 250, 0.92)), url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            bgcolor: '#fffdfa' 
        }}>
            {/* 1. PROFESSIONAL NAVBAR */}
            <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#4e342e', borderBottom: '2px solid #bf360c' }}>
                <Toolbar sx={{ px: 4, py: 1.5, display: 'flex', justifyContent: 'space-between', minHeight: '95px' }}>
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

            {/* 2. MODERN HERO SECTION */}
            <Box sx={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                py: { xs: 12, md: 18 }, 
                textAlign: 'center', 
                position: 'relative', 
                overflow: 'hidden',
                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
            }}>
                <Typography variant="h1" sx={{ 
                    fontFamily: "'Merriweather', serif", 
                    fontWeight: 700, 
                    color: '#ffffff', 
                    mb: 1, 
                    position: 'relative', 
                    letterSpacing: '-1px', 
                    textShadow: '2px 4px 10px rgba(0,0,0,0.8)', 
                    fontSize: { xs: '2.8rem', md: '4.5rem' } 
                }}>
                    A Taste of Local<br/>Nueva Vizcaya Love
                </Typography>
                <Typography variant="h5" sx={{ 
                    fontFamily: "'Montserrat', sans-serif", 
                    color: '#ffffff', 
                    mt: 3, 
                    position: 'relative', 
                    opacity: 0.95, 
                    fontWeight: 500,
                    maxWidth: '800px',
                    mx: 'auto',
                    textShadow: '1px 2px 4px rgba(0,0,0,0.5)'
                }}>
                    Your elegant, all-day destination for authentic Filipino comforts.
                </Typography>
            </Box>

            {/* 3. CURATED ABOUT SECTION */}
            <Container id="about" maxWidth={false} sx={{ py: 14, px: 6, bgcolor: 'rgba(255, 253, 250, 0.75)', backdropFilter: 'blur(10px)' }}>
                <Box sx={{ width: 'fit-content', mx: 'auto', textAlign: 'center', mb: 6 }}>
                    <Typography variant="h4" sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, color: '#3e2723', display: 'inline-block' }}>
                        Our Story
                    </Typography>
                    <Box sx={{ width: '100%', height: '3px', bgcolor: '#bf360c', mt: 1 }} />
                </Box>
                
                <Stack spacing={4} sx={{ maxWidth: 1000, mx: 'auto' }}>
                    <Typography variant="body1" align="center" sx={{ color: '#4e342e', fontFamily: "'Montserrat', sans-serif", fontSize: '1.25rem', lineHeight: '2', fontWeight: 500 }}>
                        KuyaTabs Tapsihan was born from a deep respect for the culinary heritage of Nueva Vizcaya. 
                        What began as a humble vision in the heart of Solano has grown into a cherished destination 
                        for those seeking the perfect balance of tradition and taste. 
                    </Typography>

                    <Typography variant="body1" align="center" sx={{ color: '#6b6375', fontFamily: "'Montserrat', sans-serif", fontSize: '1.15rem', lineHeight: '1.9', fontStyle: 'italic' }}>
                        Our journey is defined by an unwavering commitment to the "Golden Standard" of Filipino comfort—perfectly tender cured beef, 
                        signature smoky garlic rice, and farm-fresh eggs served with a touch of local heart. At the core of every plate is our 
                        cherished family marinade, a secret blend of spices passed down through generations.
                    </Typography>

                    <Typography variant="body1" align="center" sx={{ color: '#4e342e', fontFamily: "'Montserrat', sans-serif", fontSize: '1.15rem', lineHeight: '1.9' }}>
                        We believe that a great meal does more than just satisfy hunger; it builds community and creates lasting memories. 
                    </Typography>
                </Stack>

                <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <RestaurantMenuIcon sx={{ color: '#bf360c', fontSize: '3.5rem', opacity: 0.4 }} />
                </Box>
            </Container>

            {/* 4. MENU SECTION */}
            <Box id="menu" sx={{ bgcolor: 'rgba(244, 243, 236, 0.9)', py: 10, backdropFilter: 'blur(5px)' }}>
                <Container maxWidth={false} sx={{ px: 6 }}>
                    <Typography variant="h4" align="center" sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, color: '#3e2723' }}>Curated Menu</Typography>
                    <Typography variant="body1" align="center" sx={{ fontFamily: "'Montserrat', sans-serif", mt: 1, mb: 5, color: '#6b6375' }}>Hand-selected delicacies prepared with fresh local ingredients</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                        <Paper elevation={3} sx={{ bgcolor: '#ffffff', borderRadius: '30px', border: '1px solid #ddd', p: 0.5 }}>
                            <Tabs value={currentTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" variant="scrollable" scrollButtons="auto" sx={{ '.MuiTabs-indicator': { bgcolor: '#bf360c', height: '3px', borderRadius: '3px' }, '.MuiTab-root': { fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: '#3e2723', borderRadius: '25px', px: 3, '&.Mui-selected': { color: '#bf360c' } } }}>
                                {categories.map((cat, index) => (<Tab key={index} label={cat} />))}
                            </Tabs>
                        </Paper>
                    </Box>
                    <Grid container spacing={4}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                                    <Card elevation={4} sx={{ borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #ddd', borderTop: '5px solid #bf360c', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 'rgba(0, 0, 0, 0.2) 0 15px 30px -5px' } }}>
                                        <CardMedia component="img" height="230" image={item.photo ? `http://localhost:5000/uploads/${item.photo}` : 'https://via.placeholder.com/250x230?text=KUYATABS+TAPSIHAN'} alt={item.name} style={{ objectFit: 'cover' }} />
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3, bgcolor: '#fff' }}>
                                            <Box><Typography variant="h6" sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, color: '#3e2723' }}>{item.name}</Typography><Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", color: '#6b6375', mt: 1 }}>{item.description}</Typography></Box>
                                            <Typography variant="h6" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, mt: 3, color: '#bf360c' }}>₱{item.price}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Box sx={{ width: '100%', py: 8, textAlign: 'center' }}><Typography variant="body1" sx={{ fontFamily: "'Montserrat', sans-serif", color: '#6b6375', fontStyle: 'italic' }}>Our kitchen is actively refining items in the "{activeCategory}" category.</Typography></Box>
                        )}
                    </Grid>
                </Container>
            </Box>

            {/* 5. LOCALISED LOCATION SECTION */}
            <Box id="location" sx={{ 
                py: 12, 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'scroll', 
                color: 'white',
                textAlign: 'center'
            }}>
                <Container maxWidth="lg">
                    <Box sx={{ width: 'fit-content', mx: 'auto', mb: 8 }}>
                        <Typography variant="h4" sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, display: 'inline-block' }}>
                            Visit Our Home in Solano
                        </Typography>
                        <Box sx={{ width: '100%', height: '3.5px', bgcolor: '#bf360c', mt: 1 }} />
                    </Box>

                    <Stack direction="column" spacing={6} alignItems="center" justifyContent="center" sx={{ maxWidth: '850px', mx: 'auto' }}>
                        <Box component="img" 
                            src="/KuyaTabsLocationImage.webp" 
                            alt="KuyaTabs Solano Location" 
                            sx={{ 
                                width: '100%', 
                                maxWidth: '850px',
                                maxHeight: '480px', 
                                objectFit: 'cover', 
                                borderRadius: '15px', 
                                boxShadow: '0 25px 60px rgba(0,0,0,0.6)', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                mx: 'auto' 
                            }} 
                        />
                        
                        <Stack spacing={4} alignItems="center" sx={{ maxWidth: '920px', mx: 'auto' }}>
                            <Box>
                                <Typography variant="overline" sx={{ color: '#bf360c', fontWeight: 700, letterSpacing: '2px' }}>LOCATION</Typography>
                                <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 1 }}>
                                    <LocationOnIcon sx={{ color: '#bf360c', mt: 0.5 }} />
                                    <Typography variant="h5" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
                                        Bintawan Road, Poblacion South, Solano, Philippines, 3709
                                    </Typography>
                                </Stack>    
                            </Box>  

                            <Box>
                                <Typography variant="overline" sx={{ color: '#bf360c', fontWeight: 700, letterSpacing: '2px' }}>SERVICE HOURS</Typography>
                                <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 1, maxWidth: '430px', mx: 'auto' }}>
                                    <AccessTimeIcon sx={{ color: '#bf360c', mt: 0.5 }} />
                                    <Typography variant="h6" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                                        Mon - Sun: 7:00 AM — 10:00 PM
                                    </Typography>
                                </Stack>
                            </Box>

                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.8 }}>
                                Nestled within the heartwarming landscapes of Solano, Nueva Vizcaya, KuyaTabs Tapsihan serves as a sanctuary for authentic flavors and local heritage. We invite you to experience our signature hospitality.
                            </Typography>

                            <Typography variant="h6" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, color: '#bf360c' }}>
                                CONTACT US: 0935 733 4640
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* 6. FINAL ARRANGED FOOTER */}
            <Box 
                component="footer" 
                sx={{ 
                    bgcolor: '#4e342e', 
                    color: '#fff', 
                    pt: 8, pb: 4, 
                    width: '100%',
                    borderTop: '6px solid #bf360c' 
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={5} justifyContent="center" textAlign="center" sx={{ maxWidth: '1000px', mx: 'auto' }}>
                        
                        {/* Column 1: Brand & Logo */}
                        <Grid item xs={12} md={4}>
                            <Box 
                                component="img"
                                src="/KuyaTabs Logo.jpg" 
                                alt="KuyaTabs Logo"
                                sx={{ 
                                    height: 70, width: 70, borderRadius: '50%', 
                                    border: '2px solid #bf360c', mb: 2 
                                }}
                            />
                            <Typography variant="h5" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: '1px' }}>
                                KUYATABS TAPSIHAN
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", opacity: 0.7, mt: 1, fontStyle: 'italic' }}>
                                Serving the "Golden Standard" of Filipino comfort food since 2016.
                            </Typography>
                        </Grid>

                        {/* Column 2: Information */}
                        <Grid item xs={10} md={4}>
                            <Stack spacing={1} alignItems="center">
                                <Box>
                                    <Typography variant="overline" sx={{ color: '#bf360c', fontWeight: 700, letterSpacing: '2px' }}>Visit Us</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", mt: 1 }}>
                                        Bintawan Road, Poblacion South<br />
                                        Solano, Nueva Vizcaya, 3709
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="overline" sx={{ color: '#bf360c', fontWeight: 700, letterSpacing: '2px' }}>Service</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, mt: 1 }}>
                                        Open Daily: 7:00 AM — 10:00 PM
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>

                        {/* Column 3: Contact & Socials */}
                        <Grid item xs={10} md={4}>
                            <Typography variant="overline" sx={{ color: '#bf360c', fontWeight: 700, letterSpacing: '2px' }}>Social Media</Typography>
                            <Box sx={{ mt: 1, mb: 2 }}>
                                <Tooltip title="Visit our Facebook Page" arrow>
                                    <IconButton color="inherit" component="a" href="https://www.facebook.com/p/Kuya-TABS-tapsihan-100063611029645/" target="_blank">
                                        <FacebookIcon fontSize="large" sx={{ '&:hover': { color: '#bf360c' } }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                <PhoneIcon sx={{ color: '#bf360c', fontSize: '1.2rem' }} />
                                <Typography variant="body1" sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}>
                                    0935 733 4640
                                </Typography>
                            </Stack>
                        </Grid>

                        {/* Bottom Copyright */}
                        <Grid item xs={12}>
                            <Box sx={{ width: '100%', height: '1px', bgcolor: 'rgba(255,255,255,0.1)', my: 4 }} />
                            <Typography variant="caption" sx={{ fontFamily: "'Montserrat', sans-serif", opacity: 0.5 }}>
                                {/* © 2026 KuyaTabs Tapsihan. All Rights Reserved. Solano, Nueva Vizcaya Branch. */}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* SCROLL TO TOP FAB */}
            <Zoom in={showScroll}>
                <Box onClick={scrollToTop} role="presentation" sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
                    <Fab sx={{ bgcolor: '#bf360c', color: '#fff', '&:hover': { bgcolor: '#4e342e' }, boxShadow: '0px 4px 15px rgba(0,0,0,0.3)' }} size="medium" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Box>
            </Zoom>
        </Box>
    );
};

export default LandingPage;