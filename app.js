// app.js
import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('Login effettuato!');
    document.getElementById('login').style.display = 'none';
    document.getElementById('registration').style.display = 'none';
    document.getElementById('upload').style.display = 'block';
  } catch (error) {
    alert('Errore di login: ' + error.message);
  }
});

// Registrazione
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert('Registrazione completata!');
    document.getElementById('login').style.display = 'none';
    document.getElementById('registration').style.display = 'none';
    document.getElementById('upload').style.display = 'block';
  } catch (error) {
    alert('Errore di registrazione: ' + error.message);
  }
});

// Caricamento e Valutazione Carta
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const fileField = document.getElementById('cardImage');

  formData.append('cardImage', fileField.files[0]);

  try {
    const response = await fetch('https://gradingone-server.onrender.com/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = `Valutazione IA: ${result.result}`;
  } catch (error) {
    console.error('Errore:', error);
    alert('Errore durante la valutazione della carta.');
  }
});
