import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

 const useTickets = (ticketId: string | undefined) => {
  const [allTickets, setAllTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();



  const fetchTickets =useCallback( async () => {
    if (!token) return; // עצור אם אין טוקן עדיין
    try {
      const res = await axios.get('http://localhost:4000/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllTickets(res.data);
    } catch (err) { console.error(err); }
  }, [token]);
  useEffect(() => { fetchTickets(); }, [token]);

const handleDelete = async (id: number) => {
  if (!window.confirm("האם אתה בטוח שברצונך למחוק פנייה זו?")) return;
  
  try {
    await axios.delete(`http://localhost:4000/tickets/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // רענון הרשימה לאחר המחיקה
    fetchTickets();
  } catch (err) {
    console.error("שגיאה במחיקה", err);
  }
};

const handleAssign = async (id: number) => {
  try {
    // עדכון הפנייה כך שתהיה משויכת למשתמש הנוכחי
    await axios.patch(`http://localhost:4000/tickets/${id}`, 
      { assigned_to: user?.id }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // רענון הרשימה כדי לראות את השינוי
    fetchTickets();
  } catch (err) {
    console.error("שגיאה בשיוך הפנייה", err);
  }
};
return { allTickets, isLoading, error, fetchTickets, setAllTickets,handleDelete,handleAssign };
};
export default useTickets;