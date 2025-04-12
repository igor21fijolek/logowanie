async function logowanie() {
    let login = document.getElementById('login').value
    let haslo = document.getElementById('haslo').value
    let url = `http://localhost:3000/logowanie/${login}/${haslo}`
    let response = await fetch(url)
    let data = await response.json()
    console.log(data);
    if(data.length === 0){
        document.getElementById('login-info').innerHTML = 'nie zalogowano'
    }else{
        console.log(data[0].uprawnienia);
        document.getElementById('login-info').innerHTML = 'zalogowano'
        if(data[0].uprawnienia === 'user'){
            window.location.href = `./user.html`
            localStorage.setItem('login', JSON.stringify(data[0]))
            localStorage.setItem('perm', JSON.stringify(data[0].uprawnienia))
        }else if(data[0].uprawnienia === 'admin'){
            window.location.href = `./admin.html`
            localStorage.setItem('login', JSON.stringify(data[0]))
            localStorage.setItem('perm', JSON.stringify(data[0].uprawnienia))
        }
    }
    
}

async function rejestracja() {
    let login = document.getElementById('login').value
    let haslo = document.getElementById('haslo').value
    let haslo2 = document.getElementById('haslo2').value

    let url = `http://localhost:3000/rejestracja/${login}/${haslo}`
    if(haslo === haslo2){
        let response = await fetch(url)
        let data = await response.json()
        console.log(data);
        console.log(response.status);
        if(response.status === 302){
            document.getElementById('rejestracja-info').innerHTML = `login juz istnieje`
        }
        if(response.status === 200){
            document.getElementById('rejestracja-info').innerHTML = `zarejestrowano`
        }
    }else{
        document.getElementById('rejestracja-info').innerHTML = `hasła nie sa takie same`
    }
}