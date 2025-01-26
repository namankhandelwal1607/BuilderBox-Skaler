import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBUCfNANOUKlVkSmPGLjqkN9Fa0qkDKKZg",
  authDomain: "builderbox-99195.firebaseapp.com",
  databaseURL: "https://builderbox-99195-default-rtdb.firebaseio.com",
  projectId: "builderbox-99195",
  storageBucket: "builderbox-99195.appspot.com",
  messagingSenderId: "21977377822",
  appId: "1:21977377822:web:9f6259c4b0717ae973920f",
  measurementId: "G-Z9FJPVY179"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };