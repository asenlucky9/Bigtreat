import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFirebase } from './FirebaseContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { firebase, isFirebaseAvailable } = useFirebase();
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user for development
  const mockUser = {
    uid: 'demo-user-id',
    email: 'demo@bigtreat.com',
    displayName: 'Demo User',
    role: 'admin' // Set default role to admin for all mock users
  };

  useEffect(() => {
    if (isFirebaseAvailable && firebase) {
      // Use Firebase Auth
      const unsubscribe = firebase.authModule.onAuthStateChanged(firebase.auth, (user) => {
        setCurrentUser(user);
        // TEMP: Force admin for all users for testing
        setUserProfile(user ? { ...user, role: 'admin' } : null);
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Development mode - do NOT auto-login
      console.log('Using mock authentication (development mode, no auto-login)');
      setCurrentUser(null);
      setUserProfile(null);
      setLoading(false);
    }
  }, [firebase, isFirebaseAvailable]);

  const signup = async (email, password, name) => {
    if (isFirebaseAvailable && firebase) {
      // Use Firebase Auth
      const { createUserWithEmailAndPassword, updateProfile } = firebase.authModule;
      const userCredential = await createUserWithEmailAndPassword(firebase.auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      setUserProfile({ ...userCredential.user, role: 'user' });
      return userCredential.user;
    } else {
      // Development mode - mock signup
      console.log('Mock signup:', { email, name });
      const newUser = { ...mockUser, email, displayName: name };
      setCurrentUser(newUser);
      setUserProfile(newUser);
      return newUser;
    }
  };

  const login = async (email, password) => {
    if (isFirebaseAvailable && firebase) {
      // Use Firebase Auth
      const { signInWithEmailAndPassword } = firebase.authModule;
      const userCredential = await signInWithEmailAndPassword(firebase.auth, email, password);
      setUserProfile(userCredential.user ? { ...userCredential.user, role: 'user' } : null); // Default to 'user', update as needed
      return userCredential.user;
    } else {
      // Development mode - mock login
      console.log('Mock login:', { email });
      if (email === 'admin@bigtreat.com' && password === 'admin123') {
        const adminUser = { ...mockUser, email, displayName: 'Admin User', role: 'admin' };
        setCurrentUser(adminUser);
        setUserProfile(adminUser);
        return adminUser;
      } else if (email === 'demo@bigtreat.com' && password === 'demo123') {
        const demoAdmin = { ...mockUser, email, displayName: 'Demo User', role: 'admin' };
        setCurrentUser(demoAdmin);
        setUserProfile(demoAdmin);
        return demoAdmin;
      } else {
        throw new Error('Invalid email or password');
      }
    }
  };

  const logout = async () => {
    if (isFirebaseAvailable && firebase) {
      // Use Firebase Auth
      const { signOut } = firebase.authModule;
      await signOut(firebase.auth);
      setUserProfile(null);
    } else {
      // Development mode - mock logout
      console.log('Mock logout');
      setCurrentUser(null);
      setUserProfile(null);
    }
  };

  const resetPassword = async (email) => {
    if (isFirebaseAvailable && firebase) {
      // Use Firebase Auth
      const { sendPasswordResetEmail } = firebase.authModule;
      await sendPasswordResetEmail(firebase.auth, email);
    } else {
      // Development mode - mock password reset
      console.log('Mock password reset email sent to:', email);
    }
  };

  const updateProfile = async (updates) => {
    if (isFirebaseAvailable && firebase && currentUser) {
      // Use Firebase Auth
      const { updateProfile: updateFirebaseProfile } = firebase.authModule;
      await updateFirebaseProfile(currentUser, updates);
    } else {
      // Development mode - mock profile update
      console.log('Mock profile update:', updates);
      setCurrentUser(prev => ({ ...prev, ...updates }));
    }
  };

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    resetPassword,
    updateProfile,
    loading,
    isFirebaseAvailable
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 