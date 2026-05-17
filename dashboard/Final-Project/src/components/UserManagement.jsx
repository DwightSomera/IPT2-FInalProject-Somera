/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableRow, 
  IconButton, Typography, Paper, Container, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box,
  Select, MenuItem, FormControl, InputLabel, Divider, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
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
            alert("New internal staff account initialized successfully!");
            setNewUser({ username: '', password: '' });
            fetchUsers();
        } catch (err) { alert("Error initializing staff credentials."); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanently erase this workspace account?")) {
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
        <Container maxWidth={false} sx={{ mt: 4, px: 4, pb: 6 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <GroupIcon sx={{ color: '#4e342e', fontSize: '1.8rem' }} />
                <Typography variant="h5" sx={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: '#4e342e', textTransform: 'uppercase' }}>
                    Staff Account Controls
                </Typography>
            </Stack>
            <Typography variant="body2" sx={{ fontFamily: "'Montserrat', sans-serif", color: '#6b6375', mb: 3 }}>
                Provision new workspace roles and administer security credentials for internal employees.
            </Typography>
            
            {/* ADD NEW STAFF FORM */}
            <Paper elevation={2} sx={{ p: 4, mb: 5, borderRadius: '8px', borderLeft: '5px solid #bf360c', bgcolor: '#ffffff' }}>
                <Typography variant="h6" sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, mb: 1, color: '#3e2723', display: 'flex', alignItems: 'center' }}>
                    <PersonAddIcon sx={{ mr: 1, color: '#bf360c' }} /> Initialize Staff Gateway
                </Typography>
                <Box component="form" onSubmit={handleAddUser} sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center', mt: 3 }}>
                    <TextField size="small" label="Employee Username" required value={newUser.username} 
                        onChange={(e) => setNewUser({...newUser, username: e.target.value})} 
                        InputLabelProps={{ sx: { fontFamily: "'Montserrat', sans-serif" } }}
                    />
                    <TextField size="small" label="Temporary Key Entry" type="password" required value={newUser.password} 
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})} 
                        InputLabelProps={{ sx: { fontFamily: "'Montserrat', sans-serif" } }}
                    />
                    <Button variant="contained" type="submit" sx={{ bgcolor: '#4e342e', '&:hover': { bgcolor: '#bf360c' }, fontFamily: "'Montserrat', sans-serif", fontWeight: 600, py: 1, px: 3 }}>
                        Provision Credentials
                    </Button>
                </Box>
            </Paper>

            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, color: '#3e2723' }}>
                Active System Operators
            </Typography>
            <Paper elevation={2} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#4e342e' }}>
                            <TableCell sx={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, py: 2 }}>Workspace Username</TableCell>
                            <TableCell sx={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, py: 2 }}>Clearance Level</TableCell>
                            <TableCell align="right" sx={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, py: 2, px: 4 }}>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id} sx={{ '&:hover': { bgcolor: '#fffdfa' } }}>
                                <TableCell sx={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: '#3e2723' }}>{user.username}</TableCell>
                                <TableCell sx={{ fontFamily: "'Montserrat', sans-serif" }}>
                                    <Box component="span" sx={{ 
                                        bgcolor: user.role === 'admin' ? 'rgba(191, 54, 12, 0.1)' : 'rgba(107, 99, 117, 0.1)',
                                        color: user.role === 'admin' ? '#bf360c' : '#6b6375',
                                        px: '10px', py: '4px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase'
                                    }}>
                                        {user.role || 'user'}
                                    </Box>
                                </TableCell>
                                <TableCell align="right" sx={{ px: 4 }}>
                                    <IconButton onClick={() => handleEditClick(user)} color="primary" sx={{ mr: 1 }}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDelete(user._id)} sx={{ color: '#d32f2f' }}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* EDIT DIALOG */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
                <DialogTitle sx={{ fontFamily: "'Merriweather', serif", fontWeight: 700, color: '#4e342e', borderBottom: '1px solid #ddd', pb: 2 }}>
                    Modify Authorization: {selectedUser.username}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <TextField fullWidth label="Username Identity" margin="normal" value={selectedUser.username} onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})} />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="dialog-role-label">System Access Clearance</InputLabel>
                            <Select labelId="dialog-role-label" value={selectedUser.role} label="System Access Clearance" onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}>
                                <MenuItem value="admin">Admin (Full Terminal Override)</MenuItem>
                                <MenuItem value="user">User (Kitchen Management Only)</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth label="Override System Password (Optional)" type="password" margin="normal" value={selectedUser.password} onChange={(e) => setSelectedUser({...selectedUser, password: e.target.value})} />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, borderTop: '1px solid #ddd' }}>
                    <Button onClick={() => setOpen(false)} sx={{ fontFamily: "'Montserrat', sans-serif", color: '#6b6375' }}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained" sx={{ bgcolor: '#bf360c', '&:hover': { bgcolor: '#4e342e' }, fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
                        Save Authority Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserManagement;