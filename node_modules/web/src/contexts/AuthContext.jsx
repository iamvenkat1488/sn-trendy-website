
import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.model) {
      setCurrentUser(pb.authStore.model);
    }
    setInitialLoading(false);
  }, []);

  const login = async (email, password) => {
    const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
    setCurrentUser(authData.record);
    return authData.record;
  };

  const signup = async (name, email, password, passwordConfirm, phone = '') => {
    const data = {
      email,
      password,
      passwordConfirm,
      name,
      phone,
      role: 'user'
    };
    const record = await pb.collection('users').create(data, { $autoCancel: false });
    return record;
  };

  const logout = () => {
    pb.authStore.clear();
    setCurrentUser(null);
  };

  const updateProfile = async (userId, data) => {
    const updated = await pb.collection('users').update(userId, data, { $autoCancel: false });
    setCurrentUser(updated);
    return updated;
  };

  const isAuthenticated = pb.authStore.isValid;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      isAdmin,
      login,
      signup,
      logout,
      updateProfile,
      initialLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
