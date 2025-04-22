async function rejestracja() {
    let login  = document.getElementById('login').value
    let haslo =  document.getElementById('haslo').value
    let haslo2 =  document.getElementById('haslo2').value

    let url = `http://localhost:3000/rejestracja/${login}/${haslo}`
    if(haslo === haslo2){
        let res = await fetch(url)
        let data = await res.json()
        if(res.status === 302){
            document.getElementById('res-info').innerHTML = 'login juz istnieje'
        }
        if(res.status === 200){
            document.getElementById('res-info').innerHTML = 'zarejestrowano'
        }
    }else{
        document.getElementById('res-info').innerHTML = 'hasla nie sa takie same'
    }
}