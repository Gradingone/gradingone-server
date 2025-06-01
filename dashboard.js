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

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = 'login.html';
  } else {
    loadCards(user.uid);
  }
});

function logout() {
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
}

function uploadCard() {
  const file = document.getElementById('fileUpload').files[0];
  const user = auth.currentUser;
  if (file && user) {
    const storageRef = storage.ref(`cards/${user.uid}/${file.name}`);
    storageRef.put(file).then(snapshot => {
      snapshot.ref.getDownloadURL().then(url => {
        // Ora mandiamo l'immagine al server per la valutazione
        fetch('http://localhost:3000/api/evaluate', { // ⚠️ METTI URL DEL TUO SERVER SE NON È LOCALE
          method: 'POST',
          body: createFormData(file)
        })
        .then(response => response.json())
        .then(data => {
          const evaluation = data.evaluation || "Valutazione non disponibile";
          const gradingCompany = data.gradingCompany || "Non specificata";
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          // Salviamo su Firestore
          db.collection('cards').add({
            userId: user.uid,
            imageUrl: url,
            evaluation: evaluation,
            gradingCompany: gradingCompany,
            timestamp: timestamp
          }).then(() => {
            alert('Carta caricata e valutata!');
            loadCards(user.uid); // Ricarica la lista
          });
        });
      });
    });
  }
}

function createFormData(file) {
  const formData = new FormData();
  formData.append('image', file);
  return formData;
}

function loadCards(userId) {
  const list = document.getElementById('cardsList');
  list.innerHTML = '';
  db.collection('cards').where('userId', '==', userId).orderBy('timestamp', 'desc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const card = doc.data();
        const cardElement = `
          <div class="card">
            <img src="${card.imageUrl}" width="100">
            <p><strong>Valutazione:</strong> ${card.evaluation}</p>
            <p><strong>Grading:</strong> ${card.gradingCompany}</p>
            <p><strong>Caricata il:</strong> ${card.timestamp ? card.timestamp.toDate().toLocaleString() : 'N/A'}</p>
          </div>
        `;
        list.innerHTML += cardElement;
      });
    });
}
