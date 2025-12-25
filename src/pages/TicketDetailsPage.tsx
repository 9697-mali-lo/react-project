import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CircularProgress, Box, Typography, Divider } from '@mui/material';
import { AuthContext } from '../context/authContext';
import { getTicketDetails, getTicketComments, addComment } from '../api/ticketApi';
import CommentList from '../components/tickets/CommentList';
import CommentForm from '../components/tickets/CommentForm';

export default function TicketDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const auth = useContext(AuthContext);
  
  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!id || !auth?.token) return;
    try {
      const [ticketData, commentsData] = await Promise.all([
        getTicketDetails(id, auth.token),
        getTicketComments(id, auth.token)
      ]);
      setTicket(ticketData);
      setComments(commentsData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendComment = async (content: string) => {
    if (!id || !auth?.token) return;
    try {
      await addComment(id, content, auth.token);
      fetchData(); // רענון הנתונים
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  useEffect(() => { fetchData(); }, [id, auth?.token]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, direction: 'rtl' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        פרטי פנייה #{id}
      </Typography>
      
      {ticket && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" color="primary">{ticket.subject}</Typography>
          <Typography variant="body1">{ticket.description}</Typography>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6">תגובות</Typography>
      <CommentList comments={comments} />
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6">הוסף תגובה</Typography>
      <CommentForm onSend={handleSendComment} />
    </Container>
  );
}