
import React, { useContext } from 'react';
import type { Ticket } from '../types/ticket';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Avatar,
  Stack,
  IconButton
} from '@mui/material';
import {
  Notifications as BellIcon,
  OpenInNew as OpenIcon,
  DeleteOutline as DeleteIcon,
  PersonAddAlt1 as AssignIcon
} from '@mui/icons-material';
import { AuthContext } from '../context/authContext';
import AssignAgent from '../components/AssignAgent';

interface TicketTableProps {
  tickets: Ticket[];
  onDelete?: (id: number) => void;
  onAssign?: (id: number) => void;
}

function TicketTable({ tickets, onDelete, onAssign }: TicketTableProps) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const userRole = auth?.user?.role;

  // פונקציית עזר לרענון הדף לאחר הצלחה
  const handleRefresh = () => {
    window.location.reload(); // או פונקציה שמגיעה מה-Parent
  };

  if (tickets.length === 0) {
    return <Typography sx={{ p: 5, textAlign: 'center' }}>לא נמצאו כרטיסים להצגה.</Typography>;
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5, mt: 3 }}>
      {tickets.map((ticket) => (
        <Paper
          key={ticket.id}
          elevation={0}
          onClick={() => navigate(`/tickets/${ticket.id}`)}
          sx={{
            width: '100%',
            p: 3,
            borderRadius: '14px',
            border: '1px solid #eaeaea',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', borderColor: '#1abc9c' }
          }}
        >
          <Stack direction="row" spacing={3} alignItems="flex-start">
            {/* אווטאר ופרטי כותב (נשאר כפי שהיה) */}
            <Avatar sx={{ bgcolor: ticket.status_id === 1 ? '#1abc9c' : '#f39c12', width: 40, height: 40 }}>
              {ticket.creator_name?.charAt(0) || 'U'}
            </Avatar>

            <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontSize: '1.05rem', fontWeight: 700 }}>
                  {ticket.creator_name || 'משתמש'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  לפני {ticket.id} ימים
                </Typography>
              </Stack>

              <Typography variant="body1" sx={{ mt: 1, mb: 1.8, color: '#34495e', fontWeight: 500 }}>
                {ticket.subject}
              </Typography>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                {/* סטטוס ועדיפות */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                   <Typography variant="caption" sx={{ bgcolor: '#f4f6f8', px: 1.5, py: 0.5, borderRadius: '10px' }}>
                    סטטוס :{ticket.status_name}
                   </Typography>
                   <Typography variant="caption" sx={{ bgcolor: '#f4f6f8', px: 1.5, py: 0.5, borderRadius: '10px' }}>
                     עדיפות:  {ticket.priority_name}
                   </Typography>
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                  {/* לוגיקה למנהל: בחירת סוכן מרשימה */}
                  {userRole === 'admin' && (
                    <Box 
                      onClick={(e) => e.stopPropagation()} // מונע פתיחת הטיקט בלחיצה על הסלקט
                      sx={{ minWidth: 150, ml: 2 }}
                    >
                      <AssignAgent ticketId={`${ticket.id}`} onUpdateSuccess={handleRefresh}
                      />
                    </Box>
                  )}

                  {/* לוגיקה לסוכן: כפתור "שייך אליי" */}
                  {userRole === 'agent' && !ticket.assigned_to && (
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AssignIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAssign?.(ticket.id);
                      }}
                      sx={{ borderRadius: '999px', borderColor: '#1abc9c', color: '#1abc9c' }}
                    >
                      שייך אליי
                    </Button>
                  )}

                  {/* כפתור מחיקה למנהל */}
                  {userRole === 'admin' && (
                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(ticket.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}

                  <IconButton sx={{ color: '#1abc9c', bgcolor: 'rgba(26,188,156,0.08)' }}>
                    <OpenIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}export default TicketTable;