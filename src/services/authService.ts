import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC0X0zNPY5Iw6bI5Lzuaz1sDfMN6uynD0Y',
  authDomain: 'graphiql-app-5c0d9.firebaseapp.com',
  projectId: 'graphiql-app-5c0d9',
  storageBucket: 'graphiql-app-5c0d9.appspot.com',
  messagingSenderId: '239887847747',
  appId: '1:239887847747:web:508052addc4f6ea495dff6',
  measurementId: 'G-ZF93JR6QSW',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
