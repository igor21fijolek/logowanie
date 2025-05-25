async function logowanie() {
    let login = document.getElementById('login').value;
    let haslo = document.getElementById('haslo').value;
    let url = `http://localhost:3000/logowanie/${login}/${haslo}`;
    let response = await fetch(url);
    let dane  = await response.json();
    console.log(dane);
    if (dane.length === 0) {
        document.getElementById('login-info').innerHTML = 'Nie zalogowano';
    } else if (dane.length > 0) {
        document.getElementById('login-info').innerHTML = 'Zalogowano';
        localStorage.setItem('login', JSON.stringify(dane[0].login));
        localStorage.setItem('uprawnienie', dane[0].uprawnienia);
        if (dane[0].uprawnienia === 'user') {
            window.location.href = './user.html';
        } else if (dane[0].uprawnienia === 'admin') {
            window.location.href = './admin.html';
        }
    } else {
        document.getElementById('login-info').innerHTML = 'Nieprawidłowy login lub hasło';
    }
}