import { AppBar, Toolbar, Typography, Box, Chip, Container, Divider } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => {
   logout();
    navigate('/login');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        bgcolor: '#fff', 
        borderBottom: '1px solid #e0e0e0',
        color: '#1a237e',
        width: '100%' // מבטיח תפיסה של כל הרוחב
      }}
    >
      {/* maxWidth={false} מבטל את הגבלת הרוחב המרכזית */}
      <Container maxWidth={false} disableGutters>

      {/* <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}> */}
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          {/* לוגו ושם המערכת - צד ימין */}
          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
            onClick={() => navigate('/')}
          >
            <SupportAgentIcon sx={{ fontSize: 28, mr: 1, color: '#1a237e' }} />
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '0.5px', fontSize: '1.1rem' }}>
              TICKET<span style={{ color: '#1a73e8' }}>PRO</span>
              <Typography component="span" sx={{ fontSize: '0.7rem', ml: 1, color: '#5f6368', fontWeight: 400 }}>
                | מערכת ניהול רשמית
              </Typography>
            </Typography>
          </Box>

          {/* פרטי משתמש ופעולות - צד שמאל */}
          {user?  (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#202124', lineHeight: 1 }}>
                  {user?.name}
                </Typography>
                <Typography variant="caption" sx={{ color: '#5f6368', fontWeight: 600 }}>
                  {user?.role === 'admin' ? 'מנהל מערכת' : 'סוכן שירות'}
                </Typography>
              </Box>

              <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, my: 'auto' }} />

              <Button 
                variant="text" 
                color="inherit" 
                size="small"
                startIcon={<LogoutIcon sx={{ ml: 1, fontSize: 18 }} />}
                onClick={handleLogout}
                sx={{ 
                  fontWeight: 700,
                  color: '#5f6368',
                  '&:hover': { color: '#d32f2f', bgcolor: 'transparent' }
                }}
              >
                יציאה
              </Button>
            </Box>
            
          )
          : (
            // תצוגה למשתמש שאינו מחובר
            <>
              <Button onClick={() => navigate('/login')} >
                התחברות
              </Button>
              <Button onClick={() => navigate('/register')}>
                הרשמה
              </Button>
            </>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}

