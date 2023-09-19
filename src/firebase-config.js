import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBR52Q3rPbg_WmaLM6Nz8o2kBvX3z8zinY',
    authDomain: 'movie-react-e765c.firebaseapp.com',
    databaseURL: 'https://movie-react-e765c-default-rtdb.firebaseio.com',
    projectId: 'movie-react-e765c',
    storageBucket: 'movie-react-e765c.appspot.com',
    messagingSenderId: '52567767693',
    appId: '1:52567767693:web:c5b5d1cd47a66fe0e640c4',
    measurementId: 'G-CFNMD5JFZD',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
