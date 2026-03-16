import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC2SQVYMwl5-eaUFH7eXamiPKT9kNT1b3w",
  authDomain: "web-portfolio-te.firebaseapp.com",
  projectId: "web-portfolio-te",
  storageBucket: "web-portfolio-te.firebasestorage.app",
  messagingSenderId: "1063788219133",
  appId: "1:1063788219133:web:4a885589fe970de6a38c94"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
