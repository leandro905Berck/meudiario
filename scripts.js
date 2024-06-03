document.getElementById('login-button').addEventListener('click', loginUser);
document.getElementById('register-button').addEventListener('click', registerUser);
document.getElementById('save-entry').addEventListener('click', saveEntry);
document.getElementById('list-entries').addEventListener('click', listEntries);

function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Por favor, insira o email e a senha.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Login bem-sucedido!');
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('entry-section').style.display = 'block';
        localStorage.setItem('currentUser', email);
    } else {
        alert('Email ou senha incorretos.');
    }
}

function registerUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Por favor, insira o email e a senha.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.email === email);

    if (!userExists) {
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registrado com sucesso!');
    } else {
        alert('Usuário já existe.');
    }
}

function saveEntry() {
    const email = localStorage.getItem('currentUser');
    const entry = document.getElementById('entry-text').value;

    if (entry.trim()) {
        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push({ email, entry, date: new Date().toLocaleString() });
        localStorage.setItem('entries', JSON.stringify(entries));
        alert('Registro salvo com sucesso!');
        document.getElementById('entry-text').value = '';
    } else {
        alert('Escreva alguma coisa.');
    }
}

function listEntries() {
    const email = localStorage.getItem('currentUser');
    const entriesList = document.getElementById('entries-list');
    entriesList.innerHTML = '';

    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    const userEntries = entries.filter(entry => entry.email === email);

    if (userEntries.length > 0) {
        userEntries.forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';

            const entryText = document.createElement('p');
            entryText.innerText = entry.entry;
            listItem.appendChild(entryText);

            const entryDate = document.createElement('small');
            entryDate.innerText = `Salvo em: ${entry.date}`;
            listItem.appendChild(entryDate);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Excluir';
            deleteButton.className = 'btn btn-danger btn-sm float-right ml-2';
            deleteButton.addEventListener('click', () => deleteEntry(index));
            listItem.appendChild(deleteButton);

            const editButton = document.createElement('button');
            editButton.innerText = 'Editar';
            editButton.className = 'btn btn-warning btn-sm float-right';
            editButton.addEventListener('click', () => editEntry(index));
            listItem.appendChild(editButton);

            entriesList.appendChild(listItem);
        });
    } else {
        const noEntries = document.createElement('li');
        noEntries.className = 'list-group-item';
        noEntries.innerText = 'Nenhuma entrada encontrada.';
        entriesList.appendChild(noEntries);
    }
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    listEntries();
}

function editEntry(index) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    const newEntry = prompt('Edite sua entrada:', entries[index].entry);

    if (newEntry !== null) {
        entries[index].entry = newEntry;
        localStorage.setItem('entries', JSON.stringify(entries));
        listEntries();
    }
}
