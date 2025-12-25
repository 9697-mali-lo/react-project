
import { useState } from 'react';
import {
    Drawer, List, ListItem, ListItemButton, ListItemIcon,
    ListItemText, Collapse, Box, Divider, Typography
} from '@mui/material';
import {
    Person as PersonIcon,
    Build as BuildIcon,
    ExpandLess, ExpandMore,
    Logout as LogoutIcon,
    GroupAdd as GroupAddIcon // אייקון מתאים להוספת משתמש
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const drawerWidth = 260;


const Sidebar = () => {
    const [openAdminMenu, setOpenAdminMenu] = useState(true);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleAdminMenuClick = () => {
        setOpenAdminMenu(!openAdminMenu);
    };

    return (
        <Drawer
            variant="permanent"
            anchor="right"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                // וודא שה-Drawer מעל אלמנטים אחרים במידת הצורך
                zIndex: (theme) => theme.zIndex.drawer + 1, 
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#2c3e50',
                    color: '#ffffff',
                    direction: 'rtl',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            {/* לוגו עליון - תמיד יופיע */}
            <Box sx={{ p: 3, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ecf0f1' }}>
                    TICKET PRO
                </Typography>
                {/* שורת עזר לבדיקה - מחק אותה אחרי שתראה שהרשימה עובדת */}
                <Typography variant="caption" sx={{ color: '#bdc3c7' }}>
                    מחובר בתור: {user?.role || 'אורח'}
                </Typography>
            </Box>

            <List sx={{ pt: 2, flexGrow: 1, overflowY: 'auto' }}>
                {/* רשימת המנהל תופיע רק אם התנאי מתקיים */}
                {user?.role === 'admin' ? (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleAdminMenuClick} sx={{ py: 1.5 }}>
                                <ListItemIcon sx={{ color: '#ecf0f1', minWidth: 40 }}>
                                    <GroupAddIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="הרשאות מנהל"
                                    primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
                                    sx={{ textAlign: 'right' }}
                                />
                                {openAdminMenu ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </ListItem>

                        <Collapse in={openAdminMenu} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding sx={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                <ListItemButton sx={{ pr: 6 }} onClick={() => navigate(`/add-user-agent/admin`)}>
                                    <ListItemText primary="הוספת מנהל" sx={{ textAlign: 'right' }} />
                                </ListItemButton>
                                <ListItemButton sx={{ pr: 6 }} onClick={() => navigate(`/add-user-agent/agent`)}>
                                    <ListItemText primary="הוספת סוכן" sx={{ textAlign: 'right' }} />
                                </ListItemButton>
                                <ListItemButton sx={{ pr: 6 }} onClick={() => navigate(`/add-user-agent/customer`)}>
                                    <ListItemText primary="הוספת משתמש" sx={{ textAlign: 'right' }} />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </>
                ) : (
                    // הודעה זמנית למקרה שהמשתמש אינו אדמין
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#bdc3c7' }}>
                            אין תפריט זמין לסוג חשבון זה
                        </Typography>
                    </Box>
                )}
            </List>

            {/* כפתור יציאה - מחוץ ל-List הראשי כדי שישאר בתחתית */}
            <Box sx={{ p: 1, mt: 'auto' }}>
                <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mb: 1 }} />
                <ListItemButton onClick={logout} sx={{ borderRadius: 1 }}>
                    <ListItemIcon sx={{ color: '#e74c3c', minWidth: 40 }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="יציאה" sx={{ textAlign: 'right', color: '#e74c3c' }} />
                </ListItemButton>
            </Box>
        </Drawer>
    );
};

export default Sidebar;