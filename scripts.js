// Função para salvar entrada
document.getElementById('save-entry').addEventListener('click', function() {
    const entryText = document.getElementById('entry-text').value;
    if (entryText.trim()) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push({
            id: new Date().getTime(),
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
        li.innerHTML = `
            <span>${entry.text}</span>
            <div class="entry-actions">
                <button onclick="editEntry(${entry.id})">Editar</button>
                <button onclick="deleteEntry(${entry.id})">Excluir</button>
            </div>
        `;
        entryList.appendChild(li);
    });
}

// Função para editar entrada
function editEntry(id) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entry = entries.find(entry => entry.id === id);
    document.getElementById('edit-text').value = entry.text;
    $('#editModal').modal('show');
    document.getElementById('save-edit').onclick = function() {
        saveEdit(id);
    };
}

function saveEdit(id) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    const entryIndex = entries.findIndex(entry => entry.id === id);
    entries[entryIndex].text = document.getElementById('edit-text').value;
    localStorage.setItem('entries', JSON.stringify(entries));
    $('#editModal').modal('hide');
    loadEntries();
}

// Função para deletar entrada
function deleteEntry(id) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem('entries', JSON.stringify(entries));
    loadEntries();
}

// Carregar entradas ao inicializar
document.addEventListener('DOMContentLoaded', loadEntries);
