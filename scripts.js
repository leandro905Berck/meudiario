// Configuração do Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5XEysOKTDnihO-0gqiXePVFEbajHfaTE",
  authDomain: "meudiario-124e7.firebaseapp.com",
  projectId: "meudiario-124e7",
  storageBucket: "meudiario-124e7.appspot.com",
  messagingSenderId: "462870483593",
  appId: "1:462870483593:web:eabf7abea4339d0931ac58",
  measurementId: "G-68X7XEVCK4"
};

// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para salvar entrada
document.getElementById('save-entry').addEventListener('click', function() {
    const entryText = document.getElementById('entry-text').value;
    if (entryText.trim()) {
        db.collection('entries').add({
            text: entryText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            document.getElementById('entry-text').value = '';
            loadEntries();
        });
    }
});

// Função para carregar entradas
function loadEntries() {
    const entryList = document.getElementById('entry-list');
    entryList.innerHTML = '';
    db.collection('entries').orderBy('timestamp', 'desc').get().then(snapshot => {
        snapshot.forEach(doc => {
            const entry = doc.data();
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = entry.text;
            entryList.appendChild(li);
        });
    });
}

// Carregar entradas ao inicializar
document.addEventListener('DOMContentLoaded', loadEntries);
