// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// ✅ La tua configurazione di Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDvn2qXe0Gl6jWEt67Ml74jvQyDDi38QY8",
  authDomain: "gradingone-ec528.firebaseapp.com",
  projectId: "gradingone-ec528",
  storageBucket: "gradingone-ec528.appspot.com",
  messagingSenderId: "363098232645",
  appId: "1:363098232645:web:12d8fa9c78c2679593902c",
  measurementId: "G-N50CB15SLE"
};

// 🔥 Inizializza Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
