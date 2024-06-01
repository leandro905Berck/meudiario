// Função para salvar entrada
document.getElementById('save-entry').addEventListener('click', function() {
    const entryText = document.getElementById('entry-text').value;
    if (entryText.trim()) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push({
            text: entryText,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('entries', JSON.stringify(entries));
        document.getElementById('entry-text').value = '';
        loadEntries();
    }
});

// Função para carregar entradas
function loadEntries() {
    const entryList = document.getElementById('entry-list');
    entryList.innerHTML = '';
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    entries.forEach(entry => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = entry.text;
        entryList.appendChild(li);
    });
}

// Carregar entradas ao inicializar
document.addEventListener('DOMContentLoaded', loadEntries);
