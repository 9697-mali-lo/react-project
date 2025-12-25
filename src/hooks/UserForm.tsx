import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import type { RegisterFormData } from '../types/RegisterFormData';

interface UserFormProps {
  title: string;
  buttonLabel: string;
  onSubmit: (data: RegisterFormData) => void | Promise<void>;
  initialRole: "customer" | "agent" | "admin";
}

const UserForm = ({ title, buttonLabel, onSubmit, initialRole }: UserFormProps) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    role: initialRole || 'customer', // תיקון ל-OR לוגי
  });

  // עדכון ה-role בתוך formData בכל פעם שה-initialRole משתנה מבחוץ
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      role: initialRole
    }));
  }, [initialRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 4 }}
    >
      <Typography variant="h5" textAlign="center" sx={{ mb: 2 }}>
        {title}
      </Typography>
      
      <TextField name="name" label="שם מלא" onChange={handleChange} value={formData.name} required fullWidth />
      <TextField name="email" type="email" label="אימייל" onChange={handleChange} value={formData.email} required fullWidth />
      <TextField name="password" type="password" label="סיסמה" onChange={handleChange} value={formData.password} required fullWidth />
      
      <Box sx={{ p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
        <Typography variant="body2" color="textSecondary">
          סוג חשבון מוגדר: <strong>{
            initialRole === 'admin' ? 'מנהל' : 
            initialRole === 'agent' ? 'סוכן' : 'לקוח'
          }</strong>
        </Typography>
      </Box>

      <Button 
        type="submit" 
        variant="contained" 
        size="large"
        sx={{ mt: 2, backgroundColor: '#2c3e50', '&:hover': { backgroundColor: '#34495e' } }}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default UserForm;