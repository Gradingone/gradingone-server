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

// Registrazione
function register() {
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'dashboard.html'; // Dopo registrazione
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Login
function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = 'dashboard.html'; // Dopo login
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Reset password
function resetPassword() {
  const email = document.getElementById('resetEmail').value;
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert('Email inviata per reimpostare la password!');
    })
    .catch((error) => {
      alert(error.message);
    });
}
