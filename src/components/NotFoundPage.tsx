
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // דורש התקנה של @mui/icons-material

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 3
        }}
      >
        {/* אייקון שגיאה */}
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', opacity: 0.8 }} />
        
        <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          404
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          הדף לא נמצא
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          מצטערים, הדף שחיפשת אינו קיים. ייתכן שהקישור שבור או שהדף הוסר.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/')}
            sx={{ px: 4 }}
          >
            חזרה לדף הבית
          </Button>
          
          <Button 
            variant="outlined" 
            size="large" 
            onClick={() => navigate(-1)}
            sx={{ px: 4 }}
          >
            חזור לדף הקודם
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;