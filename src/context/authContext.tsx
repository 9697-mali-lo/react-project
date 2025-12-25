
import { createContext, useState, useEffect, type ReactNode } from 'react';
import { fetchUserInfo } from '../api/fetchUserInfo';

// הגדרת המבנה של המשתמש כפי שהוא חוזר מהשרת שלך
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'customer';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setToken(savedToken);
        try {
          const userData = await fetchUserInfo(savedToken);
          setUser(userData); // כאן המערכת "נזכרת" מי המשתמש ומעדכנת את ה-State
        } catch (error) {
          logout(); // אם הטוקן לא תקין - נתק את המשתמש
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);


  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    // localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;






