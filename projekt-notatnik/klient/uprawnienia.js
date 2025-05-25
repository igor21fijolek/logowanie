let loginLocalStorage = localStorage.getItem('login');
let uprawnienieLocalStorage = localStorage.getItem('uprawnienie'); 
let stronaUrl = window.location.href;
let sprUprawnienia = stronaUrl.slice(
    stronaUrl.lastIndexOf('/') + 1,
    stronaUrl.lastIndexOf('.')
);

if (
    loginLocalStorage === null ||
    uprawnienieLocalStorage !== sprUprawnienia
) {
    window.location.href = `./logowanie.html`;
}