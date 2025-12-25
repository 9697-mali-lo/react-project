import { useContext } from 'react';
import { AuthContext } from '../context/authContext'; 

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // הגנה: מוודא שהשתמשנו ב-Hook רק בתוך ה-Provider
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};