import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

interface CommentFormProps {
  onSend: (content: string) => void;
}

export default function CommentForm({ onSend }: CommentFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSend(content);
    setContent('');
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="כתוב תגובה חדשה..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button 
        variant="contained" 
        onClick={handleSubmit}
        sx={{ mt: 1, bgcolor: '#27ae60', '&:hover': { bgcolor: '#219150' } }}
      >
        שלח תגובה
      </Button>
    </Box>
  );
}