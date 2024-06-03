document.getElementById('login-button').addEventListener('click', loginUser);
document.getElementById('register-button').addEventListener('click', registerUser);
document.getElementById('save-entry').addEventListener('click', saveEntry);
document.getElementById('list-entries').addEventListener('click', listEntries);

async function fetchData() {
    const response = await fetch('/data');
    const data = await response.text();
    return data ? JSON.parse(data) : { users: [], entries: [] };
}

async function saveData(data) {
    await fetch('/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: JSON.stringify(data) })
    });
}

async function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Por favor, insira o email e a senha.');
        return;
    }

    const data = await fetchData();
    const user = data.users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Login bem-sucedido!');
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('entry-section').style.display = 'block';
        localStorage.setItem('currentUser', email);
    } else {
        alert('Email ou senha incorretos.');
    }
}

async function registerUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Por favor, insira o email e a senha.');
        return;
    }

    const data = await fetchData();
    const userExists = data.users.some(user => user.email === email);

    if (!userExists) {
        data.users.push({ email, password });
        await saveData(data);
        alert('Registrado com sucesso!');
    } else {
        alert('Usuário já existe.');
    }
}

async function saveEntry() {
    const email = localStorage.getItem('currentUser');
    const entry = document.getElementById('entry-text').value;

    if (entry.trim()) {
        const data = await fetchData();
        data.entries.push({ email, entry, date: new Date().toLocaleString() });
        await saveData(data);
        alert('Registro salvo com sucesso!');
        document.getElementById('entry-text').value = '';
    } else {
        alert('Escreva alguma coisa.');
    }
}

async function listEntries() {
    const email = localStorage.getItem('currentUser');
    const entriesList = document.getElementById('entries-list');
    entriesList.innerHTML = '';

    const data = await fetchData();
    const userEntries = data.entries.filter(entry => entry.email === email);

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

async function deleteEntry(index) {
    const data = await fetchData();
    data.entries.splice(index, 1);
    await saveData(data);
    listEntries();
}

async function editEntry(index) {
    const data = await fetchData();
    const newEntry = prompt('Edite sua entrada:', data.entries[index].entry);

    if (newEntry !== null) {
        data.entries[index].entry = newEntry;
        await saveData(data);
        listEntries();
    }
}
