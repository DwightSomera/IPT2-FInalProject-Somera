/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  TextField, Button, Paper, Typography, Container, 
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box,
  Select, MenuItem, FormControl, InputLabel, Stack, Grid, Fab, Zoom 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';

const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', price: '', category: 'Silog Meals', photo: null });
    const [editId, setEditId] = useState(null);
    const [showScroll, setShowScroll] = useState(false);

    // 1. Scroll-to-Top Logic
    useEffect(() => {
        const checkScroll = () => {
            if (!showScroll && window.pageYOffset > 300) {
                setShowScroll(true);
            } else if (showScroll && window.pageYOffset <= 300) {
                setShowScroll(false);
            }
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, [showScroll]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/menu');
            setMenuItems(res.data);
        } catch (err) {
            console.error("Error fetching menu:", err);
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        if (formData.photo) data.append('photo', formData.photo);

        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/menu/${editId}`, data);
                setEditId(null);
            } else {
                await axios.post('http://localhost:5000/api/menu', data);
            }
            
            setFormData({ name: '', description: '', price: '', category: 'Silog Meals', photo: null });
            fetchMenu();
            alert("Menu updated successfully!");
        } catch (err) {
            alert("Error saving menu item. Check your server.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this dish?")) {
            await axios.delete(`http://localhost:5000/api/menu/${id}`);
            fetchMenu();
        }
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setFormData({ 
            name: item.name, 
            description: item.description, 
            price: item.price, 
            category: item.category || 'Silog Meals', 
            photo: null 
        });
        scrollToTop(); // Automatically brings Admin back to the form
    };

    const handleCancel = () => {
        setEditId(null);
        setFormData({ name: '', description: '', price: '', category: 'Silog Meals', photo: null });
    };

    return (
        <Container maxWidth={false} sx={{ mt: 4, px: 4, pb: 6 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <RestaurantMenuIcon sx={{ color: '#4e342e', fontSize: '1.8rem' }} />
                <Typography variant="h5" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: '#4e342e', textTransform: 'uppercase' }}>
                    Kitchen Menu Catalog
                </Typography>
            </Stack>
            <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", color: '#6b6375', mb: 3 }}>
                Create, modify, or remove food items and beverage selections dynamically.
            </Typography>
            
            <Paper elevation={2} sx={{ p: 4, mb: 5, borderRadius: '8px', borderTop: '4px solid #bf360c', bgcolor: '#ffffff' }}>
                <Typography variant="h6" sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, mb: 2, color: '#3e2723' }}>
                    {editId ? "Modify Dish Details" : "Add Kitchen Recipe"}
                </Typography>
                
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Dish Title" value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})} required 
                                InputLabelProps={{ sx: { fontFamily: "'Montserrat', sans-serif" } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Price (₱)" type="number" value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})} required 
                                InputLabelProps={{ sx: { fontFamily: "'Montserrat', sans-serif" } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="category-label" sx={{ fontFamily: "'Montserrat', sans-serif" }}>Designated Section</InputLabel>
                                <Select
                                    labelId="category-label"
                                    value={formData.category}
                                    label="Designated Section"
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    sx={{ fontFamily: "'Montserrat', sans-serif" }}
                                >
                                    <MenuItem value="Silog Meals">Silog Meals</MenuItem>
                                    <MenuItem value="Sisig & Solo Meals">Sisig & Solo Meals</MenuItem>
                                    <MenuItem value="Solo Orders">Solo Orders</MenuItem>
                                    <MenuItem value="Beverages">Beverages</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", color: '#6b6375' }}>
                                    {formData.photo ? formData.photo.name : "Select Dish Illustration Photo"}
                                </Typography>
                                <input type="file" onChange={handleFileChange} accept="image/*" id="dish-photo-file" style={{ display: 'none' }} />
                                <label htmlFor="dish-photo-file">
                                    <Button component="span" variant="outlined" size="small" sx={{ fontFamily: "'Montserrat', sans-serif", color: '#4e342e', borderColor: '#4e342e' }}>
                                        Browse
                                    </Button>
                                </label>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Recipe Description / Ingredients" multiline rows={2} value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})} required 
                                InputLabelProps={{ sx: { fontFamily: "'Montserrat', sans-serif" } }}
                            />
                        </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                        <Button variant="contained" type="submit" sx={{ bgcolor: '#bf360c', '&:hover': { bgcolor: '#4e342e' }, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, px: 4 }}>
                            {editId ? "Update Registry" : "Deploy to Live Menu"}
                        </Button>
                        {editId && (
                            <Button variant="outlined" color="inherit" onClick={handleCancel} sx={{ fontFamily: "'Montserrat', sans-serif" }}>
                                Cancel Modification
                            </Button>
                        )}
                    </Box>
                </form>
            </Paper>

            <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Merriweather', serif", fontWeight: 700, color: '#3e2723' }}>
                Active Live Menu Registry
            </Typography>
            <Paper elevation={2} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#4e342e' }}>
                            <TableCell sx={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>Illustration</TableCell>
                            <TableCell sx={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>Dish Name</TableCell>
                            <TableCell sx={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>Target Section</TableCell>
                            <TableCell sx={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>Pricing Valuation</TableCell>
                            <TableCell align="right" sx={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, px: 4 }}>Management Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menuItems.map((item) => (
                            <TableRow key={item._id} sx={{ '&:hover': { bgcolor: '#fffdfa' } }}>
                                <TableCell>
                                    {item.photo ? (
                                        <img src={`http://localhost:5000/uploads/${item.photo}`} alt={item.name} width="65" height="65" style={{ objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                                    ) : (
                                        <Box sx={{ width: 65, height: 65, bgcolor: '#f4f3ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontFamily: "'Montserrat', sans-serif", color: '#6b6375', borderRadius: '4px' }}>Empty</Box>
                                    )}
                                </TableCell>
                                <TableCell sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, color: '#3e2723' }}>{item.name}</TableCell>
                                <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", color: '#6b6375', fontWeight: 500 }}>{item.category || 'Silog Meals'}</TableCell>
                                <TableCell sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, color: '#bf360c', fontSize: '1.1rem' }}>₱{item.price}</TableCell>
                                <TableCell align="right" sx={{ px: 4 }}>
                                    <IconButton onClick={() => handleEdit(item)} color="primary" sx={{ mr: 1 }}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDelete(item._id)} sx={{ color: '#d32f2f' }}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* SCROLL TO TOP FAB (Admin Style) */}
            <Zoom in={showScroll}>
                <Box onClick={scrollToTop} role="presentation" sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
                    <Fab sx={{ bgcolor: '#4e342e', color: '#fff', '&:hover': { bgcolor: '#bf360c' } }} size="medium" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Box>
            </Zoom>
        </Container>
    );
};

export default MenuManagement;