import axios from 'axios';

const BASE_URL = 'http://localhost:4000/tickets';

export const getTicketDetails = async (id: string, token: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getTicketComments = async (id: string, token: string) => {
  const res = await axios.get(`${BASE_URL}/${id}/comments`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateTicketStatus = async (id: string, statusId: number, token: string) => {
  await axios.patch(`${BASE_URL}/${id}`, 
    { status_id: statusId }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const addComment = async (id: string, content: string, token: string) => {
  await axios.post(`${BASE_URL}/${id}/comments`, 
    { content }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
};