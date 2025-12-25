
import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import TicketFilters from '../components/TicketFilters';
import CreateTicketModal from '../components/CreateTicketModal';
import TicketTable from './TicketTable';
import Sidebar from '../components/layout/Sidebar';

import { useAuth } from '../hooks/useAuth';
import useTickets from '../hooks/useTicket';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    agent: 'all',
    date: ''
  });

  const { allTickets, isLoading, error, fetchTickets, handleDelete, handleAssign } = useTickets(token);

  const updateFilter = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: '', status: 'all', priority: 'all', agent: 'all', date: '' });
  };

  const ticketsToShow = useMemo(() => {
    return allTickets.filter(ticket => {
      const matchesSearch =
        ticket.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
        ticket.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === 'all' || ticket.status_id === Number(filters.status);

      const matchesPriority =
        filters.priority === 'all' || ticket.priority_id === Number(filters.priority);

      const matchesAgent =
        filters.agent === 'all' || ticket.assigned_to === Number(filters.agent);

      const matchesDate =
        !filters.date || ticket.created_at.startsWith(filters.date);

      return matchesSearch && matchesStatus && matchesPriority && matchesAgent && matchesDate;
    });
  }, [allTickets, filters]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <CircularProgress size={60} sx={{ color: '#6366f1' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 3 }}>
        <Alert severity="error" sx={{ maxWidth: 500, borderRadius: 2, boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <>
      {/* HEADER */}
      <Box
        sx={{
          width: '100%',
          px: 4,
          py: 3,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          direction: 'rtl'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827' }}>
          שלום, {user?.name}
        </Typography>

        {user?.role === 'customer' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsModalOpen(true)}
            sx={{
              backgroundColor: '#6366f1',
              color: '#ffffff',
              borderRadius: '999px',
              px: 3,
              py: 1.2,
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
              '&:hover': { backgroundColor: '#4f46e5', boxShadow: '0 6px 18px rgba(99,102,241,0.4)' }
            }}
          >
            פתח פנייה חדשה
          </Button>
        )}
      </Box>

      {/* BODY */}
      <Box sx={{ display: 'flex', direction: 'rtl', minHeight: 'calc(100vh - 80px)', backgroundColor: '#f9fafb' }}>
        <Sidebar />
        <Box sx={{ width: 16 }} />

        <Box component="main" sx={{ flexGrow: 1, p: 4, minWidth: 0 }}>
          {/* כרטיסי סטטיסטיקה */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(4,1fr)' }, gap: 3, mb: 5 }}>
            {[
              { label: 'סך הכל פניות', value: allTickets.length, color: '#6366f1' },
              { label: 'פניות פעילות', value: allTickets.filter(t => t.status_id !== 3).length, color: '#10b981' },
              { label: 'בטיפול', value: allTickets.filter(t => t.status_id === 2).length, color: '#fbbf24' },
              { label: 'הושלמו', value: allTickets.filter(t => t.status_id === 3).length, color: '#3b82f6' },
            ].map((stat, idx) => (
              <Paper key={idx} elevation={1} sx={{ p: 3, borderRadius: 2, backgroundColor: '#ffffff', boxShadow: '0 6px 16px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 24px rgba(0,0,0,0.08)' } }}>
                <Typography variant="subtitle2" sx={{ color: '#6b7280', mb: 1.5, fontWeight: 500 }}>
                  {stat.label}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* סינון */}
          <Paper elevation={1} sx={{ mb: 4, p: 3, borderRadius: 2, backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ width: 6, height: 28, borderRadius: 2, backgroundColor: '#6366f1' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                סינון וחיפוש פניות
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              <TicketFilters
                onFilterChange={updateFilter}
                onReset={resetFilters}
                sx={{
                  flexGrow: 1,
                  '& input': {
                    borderRadius: 8,
                    border: '1px solid #d1d5db',
                    padding: '10px 12px',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                    '&:focus': {
                      borderColor: '#6366f1',
                      boxShadow: '0 0 0 2px rgba(99,102,241,0.2)'
                    }
                  }
                }}
              />

              <Button
                variant="outlined"
                onClick={resetFilters}
                sx={{
                  borderRadius: '999px',
                  textTransform: 'none',
                  fontWeight: 600,
                  color: '#6366f1',
                  borderColor: '#6366f1',
                  '&:hover': { backgroundColor: 'rgba(99,102,241,0.1)', borderColor: '#6366f1' }
                }}
              >
                איפוס
              </Button>
            </Box>
          </Paper>

          {/* טיקטים */}
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
            {ticketsToShow.length === 0 ? (
              <Typography sx={{ p: 5, textAlign: 'center', color: '#6b7280' }}>
                אין פניות להצגה כרגע.
              </Typography>
            ) : (
              <TicketTable tickets={ticketsToShow} onDelete={handleDelete} onAssign={handleAssign} />
            )}
          </Paper>
        </Box>
      </Box>

      {/* מודל */}
      {isModalOpen && <CreateTicketModal onClose={() => setIsModalOpen(false)} onSuccess={fetchTickets} />}
    </>
  );
}
