import React, { createContext, useContext, useState, useEffect } from 'react';

const FirebaseContext = createContext();

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider = ({ children }) => {
  const [firebase, setFirebase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeFirebase = async () => {
      try {
        // Try to import Firebase
        const firebaseModule = await import('firebase/app');
        const authModule = await import('firebase/auth');
        const firestoreModule = await import('firebase/firestore');
        const storageModule = await import('firebase/storage');

        const firebaseConfig = {
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.REACT_APP_FIREBASE_APP_ID
        };

        // Check if Firebase config is complete
        const isConfigComplete = Object.values(firebaseConfig).every(value => value && value !== 'your-value-here');
        
        if (isConfigComplete) {
          const app = firebaseModule.initializeApp(firebaseConfig);
          const auth = authModule.getAuth(app);
          const db = firestoreModule.getFirestore(app);
          const storage = storageModule.getStorage(app);

          setFirebase({
            app,
            auth,
            db,
            storage,
            authModule,
            firestoreModule,
            storageModule
          });
          console.log('✅ Firebase initialized successfully');
        } else {
          console.log('⚠️  Firebase config incomplete - running in development mode');
          setFirebase(null);
        }
      } catch (error) {
        console.log('⚠️  Firebase not available - running in development mode');
        setFirebase(null);
      } finally {
        setLoading(false);
      }
    };

    initializeFirebase();
  }, []);

  const value = {
    firebase,
    loading,
    isFirebaseAvailable: !!firebase
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}; 