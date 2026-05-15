import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableRow, 
  IconButton, Typography, Paper, Container, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box,
  Select, MenuItem, FormControl, InputLabel, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '' });
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({ _id: '', username: '', role: '', password: '' });

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', newUser);
            alert("New staff member added!");
            setNewUser({ username: '', password: '' });
            fetchUsers();
        } catch (err) { alert("Error adding user"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this account?")) {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            fetchUsers();
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser({ ...user, password: '' });
        setOpen(true);
    };

    const handleUpdate = async () => {
        await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, selectedUser);
        setOpen(false);
        fetchUsers();
    };

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom color="secondary">User Management</Typography>
            
            {/* ADD NEW STAFF FORM */}
            <Paper sx={{ p: 3, mb: 4, borderLeft: '4px solid #e65100' }}>
                <Typography variant="h6" gutterBottom><PersonAddIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Register New Staff</Typography>
                <Box component="form" onSubmit={handleAddUser} sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
                    <TextField size="small" label="Username" required value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} />
                    <TextField size="small" label="Initial Password" type="password" required value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
                    <Button variant="contained" type="submit">Add User</Button>
                </Box>
            </Paper>

            <Divider sx={{ mb: 4 }} />

            <Typography variant="h6" gutterBottom>Existing Accounts</Typography>
            <Paper elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Username</strong></TableCell>
                            <TableCell><strong>Role</strong></TableCell>
                            <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role || 'user'}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEditClick(user)} color="primary"><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDelete(user._id)} color="error"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* EDIT DIALOG */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle>Edit User: {selectedUser.username}</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Username" margin="normal" value={selectedUser.username} onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})} />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select value={selectedUser.role} label="Role" onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField fullWidth label="New Password (Optional)" type="password" margin="normal" value={selectedUser.password} onChange={(e) => setSelectedUser({...selectedUser, password: e.target.value})} />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained">Save Changes</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserManagement;