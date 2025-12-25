
import { Box, Paper, Typography, Stack } from '@mui/material';
import { Notifications as BellIcon } from '@mui/icons-material';

// שימוש ב-any או בממשק Comment ייעודי אם יש לך
interface CommentListProps {
  comments: any[]; 
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <Stack spacing={2} sx={{ mt: 3, direction: 'rtl' }}>
      {comments.map((comment) => (
        <Paper 
          key={comment.id} 
          elevation={0} 
          sx={{ 
            p: 2, 
            borderBottom: '1px solid #f0f0f0', 
            borderRadius: 0,
            backgroundColor: '#ffffff'
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
             {/* שם כותב התגובה */}
             <Typography sx={{ fontWeight: 700, color: '#27ae60' }}>
               {comment.creator_name || comment.user_name || `משתמש #${comment.created_by}`}
             </Typography>

             <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" sx={{ color: '#27ae60', fontWeight: 600 }}>
                  {comment.created_at ? new Date(comment.created_at).toLocaleDateString('he-IL') : 'זה עתה'}
                </Typography>
                <BellIcon sx={{ fontSize: 16, color: '#27ae60' }} />
             </Stack>
          </Stack>

          {/* תוכן התגובה - זה השדה שחשוב להציג */}
          <Typography variant="body2" sx={{ mt: 1, color: '#444', whiteSpace: 'pre-line' }}>
            {comment.content || comment.description} 
          </Typography>
        </Paper>
      ))}
      
      {comments.length === 0 && (
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#999', mt: 2 }}>
          אין תגובות להצגה
        </Typography>
      )}
    </Stack>
  );
}