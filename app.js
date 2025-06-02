// app.js
import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Funzione per mostrare Benvenuto
function showWelcome() {
  document.body.innerHTML = `
    <header>
      <div class="logo" id="logo">G</div>
      <h1>GradingOne</h1>
      <p class="slogan">La tua collezione. Protetta, valutata, ovunque.</p>
    </header>
    <section>
      <h2>🎉 Benvenuto su GradingOne!</h2>
      <p>Carica la tua prima carta e ottieni la valutazione AI.</p>
      <button onclick="goToUpload()">Vai a Carica Carta</button>
    </section>
  `;
}

// Quando clicca vai a caricare carta
window.goToUpload = () => {
  window.location.reload(); // Ricarica e riporta al form di upload normale
};

// LOGIN
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showWelcome();
  } catch (error) {
    alert('Errore di login: ' + error.message);
  }
});

// REGISTRAZIONE
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    showWelcome();
  } catch (error) {
    alert('Errore di registrazione: ' + error.message);
  }
});

// UPLOAD CARTA
document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
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
    resultDiv.innerText = `${result.result} GradingOne`;
  } catch (error) {
    console.error('Errore:', error);
    alert('Errore durante la valutazione della carta.');
  }
};
