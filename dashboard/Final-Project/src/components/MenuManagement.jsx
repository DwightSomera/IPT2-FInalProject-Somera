import React, { useState, useEffect } from 'react';
import { 
  TextField, Button, Paper, Typography, Container, 
  Table, TableBody, TableCell, TableHead, TableRow, IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', price: '', photo: null });
    const [editId, setEditId] = useState(null);

    // Fetch all menu items on load
    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const res = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(res.data);
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

        if (editId) {
            await axios.put(`http://localhost:5000/api/menu/${editId}`, data);
            setEditId(null);
        } else {
            await axios.post('http://localhost:5000/api/menu', data);
        }
        
        setFormData({ name: '', description: '', price: '', photo: null });
        fetchMenu();
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/menu/${id}`);
        fetchMenu();
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setFormData({ name: item.name, description: item.description, price: item.price, photo: null });
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Menu Management - KuyaTabs Tapsihan</Typography>
            
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6">{editId ? "Edit Dish" : "Add New Dish"}</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="Dish Name" margin="normal" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    <TextField fullWidth label="Description" margin="normal" multiline rows={2} value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                    <TextField fullWidth label="Price" type="number" margin="normal" value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                    <input type="file" onChange={handleFileChange} style={{ marginTop: '16px', marginBottom: '16px', display: 'block' }} />
                    
                    <Button variant="contained" color="primary" type="submit">
                        {editId ? "Update Item" : "Add to Menu"}
                    </Button>
                </form>
            </Paper>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Photo</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {menuItems.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>
                                <img src={`http://localhost:5000/uploads/${item.photo}`} alt={item.name} width="50" />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>₱{item.price}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEdit(item)} color="primary"><EditIcon /></IconButton>
                                <IconButton onClick={() => handleDelete(item._id)} color="secondary"><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default MenuManagement;