import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import your components
import LandingPage from './pages/LandingPage';
import Auth from './Auth';
import MenuManagement from './components/MenuManagement';

// 1. Define the Style Guide (Colors, Typography, Components) 
const theme = createTheme({
  palette: {
    primary: {
      main: '#e65100', // Deep Orange - represents appetizing tapsi branding 
    },
    secondary: {
      main: '#5d4037', // Rustic Brown - reflects local Nueva Vizcaya vibes 
    },
    background: {
      default: '#fffdfa', // Cream white for a professional UI [cite: 25, 34]
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700, color: '#3e2723' },
  },
});

function App() {
  // Function to check if the admin is logged in [cite: 11]
  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline ensures consistent styling across browsers  */}
      <CssBaseline /> 
      <Router>
        <Routes>
          {/* Public Landing Page: About, Location, Menu, Social Media [cite: 4, 5, 7, 8, 9, 10] */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin Login/Sign-up Page [cite: 11] */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected Admin Panel for Menu Management [cite: 6, 12, 31] */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated() ? <MenuManagement /> : <Navigate to="/auth" />} 
          />
          
          {/* Catch-all route to redirect any unknown URLs to the Landing Page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;