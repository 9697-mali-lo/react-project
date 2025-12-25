import { useAuth } from '../hooks/useAuth';
import type { RegisterFormData } from '../types/RegisterFormData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAdminUsers = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const createAdminUser = async (formData: RegisterFormData) => {
    try {
      // Axios post: (URL, Data, Config)
      const response = await axios.post(
        'http://localhost:4000/users', 
        formData, // הנתונים נשלחים כפרמטר שני
        {
          headers: {
            'Authorization': `Bearer ${token}` // טוקן בפרמטר השלישי
          }
        }
      );

      // אם הגענו לכאן, הסטטוס הוא 2xx (הצלחה)
      alert('המשתמש/הסוכן נוסף בהצלחה למערכת!');
      navigate('/dashboard'); 
      
    } catch (error: any) {
      console.error('Admin Create User Error:', error);
      
      // שליפת הודעת השגיאה מהשרת דרך Axios
      const errorMessage = error.response?.data?.message || 'שגיאה ביצירת משתמש';
      alert(errorMessage);
    }
  };

  return { createAdminUser };
};

export default useAdminUsers;