import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { User } from 'firebase/auth';

export interface Tramite {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Document {
  id: string;
  name: string;
  completed: boolean;
}

export interface Reminder {
  id: string;
  tramiteId: string;
  tramiteTitle: string;
  message: string;
  date: string;
  createdAt: Date;
}

export interface Folder {
  id: string;
  tramiteId: string;
  tramiteTitle: string;
  documents: Document[];
  createdAt: Date;
}

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  isPremium: boolean;
  premiumSince?: Date;
  createdAt: Date;
  lastLogin: Date;
  favorites?: Tramite[];
  reminders?: Reminder[];
  folders?: Folder[];
}

// Crear o actualizar datos del usuario en Firestore
export const createOrUpdateUser = async (user: User, additionalData: Partial<UserData> = {}) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  const userData: Partial<UserData> = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    lastLogin: new Date(),
    ...additionalData,
  };

  if (!userSnap.exists()) {
    // Usuario nuevo - crear con valores por defecto
    userData.isPremium = false;
    userData.createdAt = new Date();
    userData.favorites = [];
    userData.reminders = [];
    userData.folders = [];
    await setDoc(userRef, userData);
  } else {
    // Usuario existente - solo actualizar lastLogin y datos adicionales
    await updateDoc(userRef, userData);
  }

  return userData;
};

// Obtener datos del usuario desde Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        lastLogin: data.lastLogin?.toDate() || new Date(),
        premiumSince: data.premiumSince?.toDate(),
      } as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Actualizar estado premium del usuario
export const updatePremiumStatus = async (uid: string, isPremium: boolean) => {
  try {
    const userRef = doc(db, 'users', uid);
    const updateData: Partial<UserData> = {
      isPremium,
      ...(isPremium && { premiumSince: new Date() }),
    };
    
    await updateDoc(userRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating premium status:', error);
    return false;
  }
};

// Agregar trámite a favoritos
export const addToFavorites = async (uid: string, tramite: Tramite) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentFavorites = userData.favorites || [];
      
      // Verificar si el trámite ya está en favoritos
      if (!currentFavorites.some((fav: Tramite) => fav.id === tramite.id)) {
        const updatedFavorites = [...currentFavorites, tramite];
        await updateDoc(userRef, { favorites: updatedFavorites });
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

// Remover trámite de favoritos
export const removeFromFavorites = async (uid: string, tramiteId: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentFavorites = userData.favorites || [];
      const updatedFavorites = currentFavorites.filter((fav: Tramite) => fav.id !== tramiteId);
      
      await updateDoc(userRef, { favorites: updatedFavorites });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

// Agregar recordatorio
export const addReminder = async (uid: string, reminder: Omit<Reminder, 'id' | 'createdAt'>) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentReminders = userData.reminders || [];
      
      const newReminder: Reminder = {
        ...reminder,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      
      const updatedReminders = [...currentReminders, newReminder];
      await updateDoc(userRef, { reminders: updatedReminders });
      return newReminder;
    }
    return null;
  } catch (error) {
    console.error('Error adding reminder:', error);
    return null;
  }
};

// Remover recordatorio
export const removeReminder = async (uid: string, reminderId: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentReminders = userData.reminders || [];
      const updatedReminders = currentReminders.filter((reminder: Reminder) => reminder.id !== reminderId);
      
      await updateDoc(userRef, { reminders: updatedReminders });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error removing reminder:', error);
    return false;
  }
};

// Agregar carpeta
export const addFolder = async (uid: string, folder: Omit<Folder, 'id' | 'createdAt'>) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentFolders = userData.folders || [];
      
      const newFolder: Folder = {
        ...folder,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      
      const updatedFolders = [...currentFolders, newFolder];
      await updateDoc(userRef, { folders: updatedFolders });
      return newFolder;
    }
    return null;
  } catch (error) {
    console.error('Error adding folder:', error);
    return null;
  }
};

// Actualizar carpeta
export const updateFolder = async (uid: string, folderId: string, folderData: Omit<Folder, 'id' | 'createdAt'>) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentFolders = userData.folders || [];
      const updatedFolders = currentFolders.map((folder: Folder) => 
        folder.id === folderId 
          ? { ...folder, ...folderData }
          : folder
      );
      
      await updateDoc(userRef, { folders: updatedFolders });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating folder:', error);
    return false;
  }
};

// Remover carpeta
export const removeFolder = async (uid: string, folderId: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const currentFolders = userData.folders || [];
      const updatedFolders = currentFolders.filter((folder: Folder) => folder.id !== folderId);
      
      await updateDoc(userRef, { folders: updatedFolders });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error removing folder:', error);
    return false;
  }
}; 