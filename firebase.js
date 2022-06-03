// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBPk4NfO2XfAcrT13PnHwTZTworsSN09Xg",
	authDomain: "fbclone-km.firebaseapp.com",
	projectId: "fbclone-km",
	storageBucket: "fbclone-km.appspot.com",
	messagingSenderId: "320711797891",
	appId: "1:320711797891:web:3a5b34ba63bf155065ffb6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, app };
