async function rejestracja(){
    let login = document.getElementById("login").value
    let haslo = document.getElementById("haslo").value
    let haslo2 = document.getElementById("haslo2").value
    let url = `http://localhost:3000/rejestracja/${login}/${haslo}`
    if(haslo === haslo2){
        let response = await fetch(url)
        let dane = await response.json()
        if(response.status === 302){
            document.getElementById("rejestracja-info").innerHTML = `Login już istnieje`
        }else if(response.status === 200){
            document.getElementById("rejestracja-info").innerHTML = "Zarejestrowano pomyślnie"
            window.location.href = './logowanie.html'
        }
    }else{
        document.getElementById("rejestracja-info").innerHTML = "Hasła nie są takie same"
    }
}