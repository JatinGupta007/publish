import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('authToken');
  });

  const [isManager, setIsManager] = useState(() => {
    return localStorage.getItem('userType') === 'manager';
  });

  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('userEmail') || '';
  });

  const login = (token, managerStatus = false, email = '') => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userType', managerStatus ? 'manager' : 'customer');
    localStorage.setItem('userEmail', email);
    setIsLoggedIn(true);
    setIsManager(managerStatus);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setIsManager(false);
    setUserEmail('');
  };

  // Check auth status whenever the component mounts or updates
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    setIsLoggedIn(!!token);
    setUserEmail(email || '');
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isManager, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
