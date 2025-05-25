import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { createOrUpdateUser, getUserData, updatePremiumStatus } from '../services/userService';
import type { UserData } from '../services/userService';

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  isPremium: boolean;
  loading: boolean;
  upgradeToPremium: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = async (user: User) => {
    try {
      // Crear o actualizar usuario en Firestore
      await createOrUpdateUser(user);
      
      // Obtener datos completos del usuario
      const data = await getUserData(user.uid);
      setUserData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const upgradeToPremium = async (): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      const success = await updatePremiumStatus(currentUser.uid, true);
      if (success && userData) {
        setUserData({
          ...userData,
          isPremium: true,
          premiumSince: new Date(),
        });
      }
      return success;
    } catch (error) {
      console.error('Error upgrading to premium:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await loadUserData(user);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    isPremium: userData?.isPremium || false,
    loading,
    upgradeToPremium,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 