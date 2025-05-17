// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Configuración de Firebase específica de tu proyecto
const firebaseConfig = {
  apiKey: 'AIzaSyC3p6fxiqnJ7HZKFERIvfxS623Z30-lVLs',
  authDomain: 'tramitia-542cc.firebaseapp.com',
  projectId: 'tramitia-542cc',
  storageBucket: 'tramitia-542cc.appspot.com',
  messagingSenderId: '738261027564',
  appId: "1:738261027564:web:c35b5678b89a9f0d0e33c9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
