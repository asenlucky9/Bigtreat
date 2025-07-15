import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const AccessDenied = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md"
    >
      <div className="text-6xl mb-4 text-pink-500 font-bold">🚫</div>
      <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
      <p className="text-gray-600 mb-6">You do not have permission to view this page.<br/>Admin access is required.</p>
      <a href="/" className="btn btn-primary">Go to Home</a>
    </motion.div>
  </div>
);

const AdminRoute = ({ children }) => {
  const { currentUser, loading, userProfile } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 border-opacity-50"></div></div>;
  }

  if (!currentUser || userProfile?.role !== 'admin') {
    return <AccessDenied />;
  }

  return children;
};

export default AdminRoute; 