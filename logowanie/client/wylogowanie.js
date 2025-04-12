const button = document.createElement('button')
button.innerHTML  = 'wyloguj'
document.body.appendChild(button)
button.addEventListener("click", ()=>{
    localStorage.removeItem('login')
    localStorage.removeItem('perm')
    window.location.href = `./logowanie.html`
})