import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import type { User } from 'firebase/auth';

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  isPremium: boolean;
  premiumSince?: Date;
  createdAt: Date;
  lastLogin: Date;
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