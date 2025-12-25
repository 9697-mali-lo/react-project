// // import { Box, Paper, Typography, Stack } from '@mui/material';
// // import { Notifications as BellIcon } from '@mui/icons-material';
// // import type { Ticket } from '../../types/ticket';
// // import { useAuth } from '../../hooks/useAuth';

// // interface CommentListProps {
// //   comments: Ticket[];
// // }

// // export default function CommentList({ comments }: CommentListProps) {
// //   return (
// //     <Stack spacing={2} sx={{ mt: 3, direction: 'rtl' }}>
// //       {comments.map((comment) => (
// //         <Paper 
// //           key={comment.id} 
// //           elevation={0} 
// //           sx={{ p: 2, borderBottom: '1px solid #f0f0f0', borderRadius: 0 }}
// //         >
// //           <Stack direction="row" justifyContent="space-between" alignItems="center">
// //              <Typography sx={{ fontWeight: 700, color: '#27ae60' }}>
// //                 {comment.status_name||comment.creator_name}
// //              </Typography>
// //              <Stack direction="row" spacing={1} alignItems="center">
// //                 <Typography variant="caption" sx={{ color: '#27ae60' }}>
// //                   לפני {comment.id} ימים
// //                 </Typography>
// //                 <BellIcon sx={{ fontSize: 16, color: '#27ae60' }} />
// //              </Stack>
// //           </Stack>
// //           <Typography variant="body2" sx={{ mt: 1, color: '#444' }}>
// //       {comment.subject}
// //             {comment.description}
// //             {comment.assigned_to}
// //             {comment.assignee_name}
// //             {comment.created_by}
// //             {comment.creator_name}
// //             {comment.subject}
// //             {comment.assigned_to}
// //           </Typography>
// //         </Paper>
// //       ))}
// //     </Stack>
// //   );
// // }
// import { Box, Paper, Typography, Stack, Divider } from '@mui/material';
// import { Notifications as BellIcon, Person as PersonIcon } from '@mui/icons-material';
// import type { Ticket } from '../../types/ticket';

// interface CommentListProps {
//   comments: Ticket[];
// }

// export default function CommentList({ comments }: CommentListProps) {
//   return (
//     <Stack spacing={2} sx={{ mt: 3, direction: 'rtl' }}>
//       {comments.map((comment) => (
//         <Paper 
//           key={comment.id} 
//           elevation={0} 
//           sx={{ p: 2, borderBottom: '1px solid #f0f0f0', borderRadius: 0 }}
//         >
//           {/* שורת כותרת: שם הכותב וזמן */}
//           <Stack direction="row" justifyContent="space-between" alignItems="center">
//              <Typography sx={{ fontWeight: 700, color: '#27ae60' }}>
//                {/* הצגת שם היוצר, ואם אין - הצגת ה-ID שלו */}
//                {comment.creator_name || `משתמש #${comment.created_by}`}
//              </Typography>
             
//              <Stack direction="row" spacing={1} alignItems="center">
//                 <Typography variant="caption" sx={{ color: '#27ae60' }}>
//                   {comment.created_at ? new Date(comment.created_at).toLocaleDateString() : `לפני ${comment.id} ימים`}
//                 </Typography>
//                 <BellIcon sx={{ fontSize: 16, color: '#27ae60' }} />
//              </Stack>
//           </Stack>

//           {/* גוף הפנייה: נושא ותיאור */}
//           <Box sx={{ mt: 1.5 }}>
//             <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333' }}>
//               {comment.subject}
//             </Typography>
//             <Typography variant="body2" sx={{ mt: 0.5, color: '#555', lineHeight: 1.6 }}>
//               {comment.description}
//             </Typography>
//           </Box>

//           {/* שורת סוכן מטפל (אופציונלי - מופיע רק אם יש סוכן) */}
//           {comment.assignee_name && (
//             <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, opacity: 0.8 }}>
//               <PersonIcon sx={{ fontSize: 14, color: '#666' }} />
//               <Typography variant="caption" sx={{ color: '#666' }}>
//                 סוכן מטפל: {comment.assignee_name}
//               </Typography>
//             </Stack>
//           )}
//         </Paper>
//       ))}
//     </Stack>
//   );
// }
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