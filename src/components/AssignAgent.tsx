
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import type { user } from '../types/user';

interface AssignAgentProps {
  ticketId: string;
  onUpdateSuccess: () => void;
}

export default function AssignAgent({ ticketId, onUpdateSuccess }: AssignAgentProps) {
  const auth = useContext(AuthContext);
  const [agents, setAgents] = useState<user[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState('');
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // 1. משיכת כל המשתמשים וסינון סוכנים/מנהלים
  const fetchAgents = async () => {
    try {
      setLoadingAgents(true);
      const res = await axios.get('http://localhost:4000/users', {
        headers: { Authorization: `Bearer ${auth?.token}` }
      });
      
      // סינון: רק מי שהתפקיד שלו הוא agent או 
      const filteredAgents = res.data.filter((u: any) => u.role === 'agent' );
      setAgents(filteredAgents);
    } catch (err) {
      console.error("שגיאה במשיכת משתמשים", err);
    } finally {
      setLoadingAgents(false);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchAgents();
  }, [auth?.token]);

  // 2. עדכון הטיקט - הנתיב המתוקן לפי ה-README
//   const handleSave = async () => {
//     if (!selectedAgentId) return;
//     try {
//       setIsUpdating(true);
//       // שים לב: הורדתי את ה-/assign מהסוף כי השרת לא מכיר אותו
//       await axios.patch(`http://localhost:4000/tickets/${ticketId}`, 
//         { assigned_to: selectedAgentId }, // השרת מצפה לשדה שנקרא assigned_to
//         { headers: { Authorization: `Bearer ${auth?.token}` } }
//       );
//       onUpdateSuccess();
//     } catch (err) {
//       console.error("שגיאה בעדכון", err);
//       alert("העדכון נכשל. בדוק ב-Swagger את שם השדה המדויק.");
//     } finally {
//       setIsUpdating(false);
//     }
//   };
const handleSave = async () => {
    if (!selectedAgentId) return;
    
    try {
      setIsUpdating(true);
      
      // המרה של ה-ID למספר כדי למנוע שגיאת 400
      const payload = { 
        assigned_to: Number(selectedAgentId) 
      };

      console.log("Sending PATCH to:", `http://localhost:4000/tickets/${ticketId}`);
      console.log("Payload:", payload);

      await axios.patch(
        `http://localhost:4000/tickets/${ticketId}`, 
        payload, 
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      
      onUpdateSuccess()
      
      alert("הסוכן הוקצה בהצלחה!");
    } catch (err: any) {
      // חילוץ הודעת השגיאה המדויקת מהשרת
      const serverMessage = err.response?.data?.message || err.response?.data || "שגיאה לא ידועה";
      console.error("שגיאת שרת מפורטת:", serverMessage);
      
      alert(`העדכון נכשל: ${serverMessage}`);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body2" sx={{ fontWeight: 700, color: '#1976d2' }}>
        הקצאת סוכן (ניהול)
      </Typography>

      <FormControl fullWidth size="small">
        <InputLabel>בחר סוכן</InputLabel>
        <Select
          value={selectedAgentId}
          label="בחר סוכן"
          onChange={(e) => setSelectedAgentId(e.target.value as string)}
          disabled={loadingAgents || isUpdating}
        >
          {agents.map((agent) => (
            <MenuItem key={agent.id} value={agent.id}>
              {agent.name} ({agent.role})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleSave}
        disabled={!selectedAgentId || isUpdating}
        sx={{ bgcolor: '#1976d2', boxShadow: 'none' }}
      >
        {isUpdating ? <CircularProgress size={24} color="inherit" /> : 'בצע הקצאה'}
      </Button>
    </Box>
  );
}