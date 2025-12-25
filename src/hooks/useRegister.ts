
import axios from "axios";
import { useNavigate } from "react-router-dom";

// הוספת השדה role לממשק כדי ש-TypeScript לא יצעק כשאנחנו מפרקים אותו
export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    role?: string; 
}

const useRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: RegisterFormData) => {
    // 1. פירוק האובייקט: מוציאים את role החוצה ומשאירים את כל השאר ב-dataToSend
    const { role, ...dataToSend } = formData;

    try {
      // 2. שליחה ב-Axios (הפרמטר השני הוא ישירות ה-Data)
      const response = await axios.post('http://localhost:4000/auth/register', dataToSend);

      // אם הגענו לכאן, הסטטוס הוא 2xx (הצלחה)
      alert('ההרשמה בוצעה בהצלחה!');
      navigate('/dashboard'); 

    } catch (error: any) {
      // 3. טיפול בשגיאות דרך ה-catch (כך axios עובד)
      if (error.response) {
        // השרת החזיר תשובה עם קוד שגיאה (4xx, 5xx)
        if (error.response.status === 409) {
          alert('האימייל הזה כבר רשום במערכת.');
        } else if (error.response.status === 400) {
          alert('נתונים לא תקינים, וודא שכל השדות מלאים כראוי.');
        } else {
          alert('שגיאה ברישום. אנא נסה שוב מאוחר יותר.');
        }
      } else {
        // שגיאת רשת (שרת כבוי וכדומה)
        console.error('Network Error:', error);
        alert('לא ניתן להתחבר לשרת.');
      }
    }
  };

  return { handleSubmit };
};

export default useRegister;
