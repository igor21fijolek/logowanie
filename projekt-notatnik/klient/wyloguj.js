const button = document.createElement('button')
button.innerHTML  = 'wyloguj'
document.getElementById('main-left').appendChild(button)
button.addEventListener("click", ()=>{
    localStorage.removeItem('login')
    localStorage.removeItem('perm')
    window.location.href = `./logowanie.html`
})