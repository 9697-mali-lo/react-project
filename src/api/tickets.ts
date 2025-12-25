import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

// שליפת רשימת עדיפויות
export const getPrioritiesApi = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/priorities`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// יצירת טיקט חדש
export const createTicketApi = async (token: string, ticketData: any) => {
  const res = await axios.post(`${BASE_URL}/tickets`, ticketData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};