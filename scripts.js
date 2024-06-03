document.getElementById('login-button').addEventListener('click', loginUser);
document.getElementById('register-button').addEventListener('click', registerUser);
document.getElementById('save-entry').addEventListener('click', saveEntry);

function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

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
        entries.push({ email, entry });
        localStorage.setItem('entries', JSON.stringify(entries));
        alert('Registro salvo com sucesso!');
        document.getElementById('entry-text').value = '';
    } else {
        alert('Escreva alguma coisa.');
    }
}
