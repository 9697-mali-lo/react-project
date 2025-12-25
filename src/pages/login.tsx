
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { loginApi } from '../api/auth';
import { AuthInput } from '../components/AuthInput';

import { Box, Button, Typography, Container } from '@mui/material';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginApi(email, password);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (error) {
      alert("פרטי התחברות שגויים");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, border: '1px solid #ccc', borderRadius: 2, boxShadow: 2 }}>
        <Typography component="h1" variant="h5">התחברות</Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <AuthInput label="Email Address" value={email} onChange={setEmail} />
          <AuthInput label="Password" type="password" value={password} onChange={setPassword} />
          
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, p: 1.5 }}>
            כניסה
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;