// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDvn2qXeoGl6jwEt67Ml74jvQyDDi38QY8",
  authDomain: "gradingone-ec528.firebaseapp.com",
  projectId: "gradingone-ec528",
  storageBucket: "gradingone-ec528.appspot.com",
  messagingSenderId: "363098232645",
  appId: "1:363098232645:web:12d8fa9c78c2679593902c"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();
