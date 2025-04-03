const JSONlocalStorage = JSON.parse(localStorage.getItem('login'))
console.log(JSONlocalStorage)
if(JSONlocalStorage === null){
    window.location.href = `./logowanie.html`
}