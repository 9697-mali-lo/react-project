export  const fetchUserInfo = async (token: string) => {
  const response = await fetch('http://localhost:4000/auth/me', {
    method: 'GET',
    headers: {
      // שליחת הטוקן בפורמט שהשרת דורש 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  // בדיקה אם התגובה תקינה (סטטוס 200)
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  // החזרת הנתונים (המשתמש) מהשרת
  return await response.json();
};