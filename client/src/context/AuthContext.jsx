import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getMe } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('prepai_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('prepai_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('prepai_token');
      if (storedToken) {
        try {
          const res = await getMe();
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('prepai_user', JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.error('Session validation error:', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    const { token: newToken, user: userData } = res.data;
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('prepai_token', newToken);
    localStorage.setItem('prepai_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (userData) => {
    const res = await registerUser(userData);
    const { token: newToken, user: newUser } = res.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('prepai_token', newToken);
    localStorage.setItem('prepai_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('prepai_token');
    localStorage.removeItem('prepai_user');
  };

  const updateUserState = (updatedUser) => {
    setUser(prev => {
      const next = { ...prev, ...updatedUser };
      localStorage.setItem('prepai_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateUserState,
        isAuthenticated: !!token && !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
