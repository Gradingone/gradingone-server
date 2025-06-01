// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDvn2qXeoGl6jwEt67Ml74jvQyDDi38QY8",
  authDomain: "gradingone-ec528.firebaseapp.com",
  projectId: "gradingone-ec528",
  storageBucket: "gradingone-ec528.appspot.com",
  messagingSenderId: "363098232645",
  appId: "1:363098232645:web:12d8fa9c78c2679593902c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Registrazione/Login
const form = document.getElementById('registrationForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Login effettuato!');
      document.getElementById('upload').style.display = 'block';
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            alert('Registrazione completata!');
            document.getElementById('upload').style.display = 'block';
          })
          .catch((error) => {
            alert('Errore Firebase: ' + error.message);
          });
      } else {
        alert('Errore Firebase: ' + error.message);
      }
    });
});

// Upload Form Dummy (Simulazione valutazione IA)
const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Valutazione in corso...<br><strong>Risultato:</strong> 9.5/10 - Consigliata Gradazione con PSA';
});
