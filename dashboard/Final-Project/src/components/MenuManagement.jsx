import React, { useState, useEffect } from 'react';
import { 
  TextField, Button, Paper, Typography, Container, 
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', price: '', photo: null });
    const [editId, setEditId] = useState(null);

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
        if (formData.photo) data.append('photo', formData.photo);

        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/menu/${editId}`, data);
                setEditId(null);
            } else {
                await axios.post('http://localhost:5000/api/menu', data);
            }
            setFormData({ name: '', description: '', price: '', photo: null });
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
        setFormData({ name: item.name, description: item.description, price: item.price, photo: null });
    };

    const handleCancel = () => {
        setEditId(null);
        setFormData({ name: '', description: '', price: '', photo: null });
    };

    return (
        /* STRETCHED: maxWidth={false} and px: 4 */
        <Container maxWidth={false} sx={{ mt: 2, px: 4 }}>
            <Typography variant="h5" align="center" gutterBottom color="secondary">
                Menu Management
            </Typography>
            
            <Paper sx={{ p: 3, mb: 4, borderTop: '4px solid #e65100' }}>
                <Typography variant="h6" gutterBottom>{editId ? "Edit Dish Details" : "Add New Dish"}</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Dish Name" margin="normal" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    <TextField fullWidth label="Description" margin="normal" multiline rows={2} value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                    <TextField fullWidth label="Price (₱)" type="number" margin="normal" value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                    
                    <Box sx={{ my: 2 }}>
                        <Typography variant="caption" display="block" gutterBottom>Dish Photo</Typography>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                    </Box>
                    
                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button variant="contained" color="primary" type="submit">
                            {editId ? "Update Item" : "Add to Menu"}
                        </Button>
                        {editId && (
                            <Button variant="outlined" color="secondary" onClick={handleCancel}>
                                Cancel Edit
                            </Button>
                        )}
                    </Box>
                </form>
            </Paper>

            <Typography variant="h6" sx={{ mb: 2 }}>Current Menu Items</Typography>
            <Paper elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Photo</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Price</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menuItems.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>
                                    {item.photo ? (
                                        <img src={`http://localhost:5000/uploads/${item.photo}`} alt={item.name} width="60" height="60" style={{ objectFit: 'cover', borderRadius: '4px' }} />
                                    ) : (
                                        <Box sx={{ width: 60, height: 60, bgcolor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>No Photo</Box>
                                    )}
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>₱{item.price}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEdit(item)} color="primary"><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDelete(item._id)} color="error"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default MenuManagement;