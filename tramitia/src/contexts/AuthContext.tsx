import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { createOrUpdateUser, getUserData, updatePremiumStatus, addToFavorites, removeFromFavorites, addReminder, removeReminder, addFolder, updateFolder, removeFolder } from '../services/userService';
import type { UserData, Tramite, Reminder, Folder } from '../services/userService';

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  isPremium: boolean;
  loading: boolean;
  upgradeToPremium: () => Promise<boolean>;
  logout: () => Promise<void>;
  addFavorite: (tramite: Tramite) => Promise<boolean>;
  removeFavorite: (tramiteId: string) => Promise<boolean>;
  addUserReminder: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => Promise<Reminder | null>;
  removeUserReminder: (reminderId: string) => Promise<boolean>;
  addUserFolder: (folder: Omit<Folder, 'id' | 'createdAt'>) => Promise<Folder | null>;
  updateUserFolder: (folderId: string, folderData: Omit<Folder, 'id' | 'createdAt'>) => Promise<boolean>;
  removeUserFolder: (folderId: string) => Promise<boolean>;
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

  const addFavorite = async (tramite: Tramite): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      const success = await addToFavorites(currentUser.uid, tramite);
      if (success && userData) {
        const updatedFavorites = [...(userData.favorites || []), tramite];
        setUserData({
          ...userData,
          favorites: updatedFavorites,
        });
      }
      return success;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  };

  const removeFavorite = async (tramiteId: string): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      const success = await removeFromFavorites(currentUser.uid, tramiteId);
      if (success && userData) {
        const updatedFavorites = (userData.favorites || []).filter(fav => fav.id !== tramiteId);
        setUserData({
          ...userData,
          favorites: updatedFavorites,
        });
      }
      return success;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  };

  const addUserReminder = async (reminder: Omit<Reminder, 'id' | 'createdAt'>): Promise<Reminder | null> => {
    if (!currentUser) return null;
    
    try {
      const newReminder = await addReminder(currentUser.uid, reminder);
      if (newReminder && userData) {
        const updatedReminders = [...(userData.reminders || []), newReminder];
        setUserData({
          ...userData,
          reminders: updatedReminders,
        });
      }
      return newReminder;
    } catch (error) {
      console.error('Error adding reminder:', error);
      return null;
    }
  };

  const removeUserReminder = async (reminderId: string): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      const success = await removeReminder(currentUser.uid, reminderId);
      if (success && userData) {
        const updatedReminders = (userData.reminders || []).filter(reminder => reminder.id !== reminderId);
        setUserData({
          ...userData,
          reminders: updatedReminders,
        });
      }
      return success;
    } catch (error) {
      console.error('Error removing reminder:', error);
      return false;
    }
  };

  const addUserFolder = async (folder: Omit<Folder, 'id' | 'createdAt'>): Promise<Folder | null> => {
    if (!currentUser) return null;
    
    try {
      const newFolder = await addFolder(currentUser.uid, folder);
      if (newFolder && userData) {
        const updatedFolders = [...(userData.folders || []), newFolder];
        setUserData({
          ...userData,
          folders: updatedFolders,
        });
      }
      return newFolder;
    } catch (error) {
      console.error('Error adding folder:', error);
      return null;
    }
  };

  const updateUserFolder = async (folderId: string, folderData: Omit<Folder, 'id' | 'createdAt'>): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      const success = await updateFolder(currentUser.uid, folderId, folderData);
      if (success && userData) {
        const updatedFolders = (userData.folders || []).map(folder => 
          folder.id === folderId 
            ? { ...folder, ...folderData }
            : folder
        );
        setUserData({
          ...userData,
          folders: updatedFolders,
        });
      }
      return success;
    } catch (error) {
      console.error('Error updating folder:', error);
      return false;
    }
  };

  const removeUserFolder = async (folderId: string): Promise<boolean> => {
    if (!currentUser) return false;
    
    try {
      const success = await removeFolder(currentUser.uid, folderId);
      if (success && userData) {
        const updatedFolders = (userData.folders || []).filter(folder => folder.id !== folderId);
        setUserData({
          ...userData,
          folders: updatedFolders,
        });
      }
      return success;
    } catch (error) {
      console.error('Error removing folder:', error);
      return false;
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
    addFavorite,
    removeFavorite,
    addUserReminder,
    removeUserReminder,
    addUserFolder,
    updateUserFolder,
    removeUserFolder,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 