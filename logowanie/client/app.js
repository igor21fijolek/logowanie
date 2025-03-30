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
        document.getElementById('login-info').innerHTML = 'zalogowano'
    }
    
}