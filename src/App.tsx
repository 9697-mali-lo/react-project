import './App.css' 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TicketDetailsPage from './pages/TicketDetailsPage';
import NotFoundPage from './components/NotFoundPage';
import Header from './components/header';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Register from './pages/Register';
import AddUserAgent from './components/AddUserAgent';

function App() {
  return (
  
    <BrowserRouter>
      { <Header />}
      <Routes>
        {/* העברה אוטומטית מדף הבית ללוגין */}
        <Route path='/' element={<Navigate to='/login' replace />} />
        {/* דף הלוגין */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tickets/:id" element={<TicketDetailsPage />} />
        <Route path="/add-user-agent/:roleName" element={<AddUserAgent />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* כאן תוכלי להוסיף בהמשך דפים נוספים כמו Tickets */}
      </Routes>
    </BrowserRouter>
  )
}

export default App