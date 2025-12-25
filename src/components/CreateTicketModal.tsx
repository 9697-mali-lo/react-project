
import React, { useEffect, useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, MenuItem, Box 
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { getPrioritiesApi, createTicketApi } from '../api/tickets';

interface TicketModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTicketModal({ onClose, onSuccess }: TicketModalProps) {
  const { token } = useAuth(); // שימוש ב-Hook שיצרנו
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priorityId, setPriorityId] = useState<number | string>('');
  const [priorities, setPriorities] = useState<{ id: number, name: string }[]>([]);

  // טעינת עדיפויות
  useEffect(() => {
    if (token) {
      getPrioritiesApi(token)
        .then(setPriorities)
        .catch(err => console.error("Error fetching priorities", err));
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTicketApi(token!, {
        subject,
        description,
        priority_id: priorityId,
        status_id: 1
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert("שגיאה ביצירת הפנייה");
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: 'right', fontWeight: 'bold' }}>פתיחת פנייה חדשה</DialogTitle>
      
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dir="rtl">
          <TextField
            margin="normal" required fullWidth variant="filled"
            label="נושא הפנייה"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            margin="normal" required fullWidth variant="filled"
            multiline rows={4}
            label="תיאור הבעיה"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            select margin="normal" required fullWidth variant="filled"
            label="עדיפות"
            value={priorityId}
            onChange={(e) => setPriorityId(e.target.value)}
          >
            {priorities.map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
            ))}
          </TextField>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
          <Button onClick={onClose} color="inherit">ביטול</Button>
          <Button type="submit" variant="contained" sx={{ px: 4, bgcolor: '#1abc9c', '&:hover': { bgcolor: '#16a085' } }}>
            שלח פנייה
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}