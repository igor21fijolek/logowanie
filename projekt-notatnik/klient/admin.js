async function zapisz_notatke() {
    let login = JSON.parse(localStorage.getItem("login"))
    console.log(login)
    let notatka = document.getElementById("notatka").value
    let url = `http://localhost:3000/dodaj-notatke/${notatka}/${login}`
    let response = await fetch(url)
    let dane = await response.json()
    if (dane.status === 200) {
        alert("Notatka zapisana pomyślnie")
        document.getElementById("notatka").value = ""
    }
    pokaz_notatki()
}
async function pokaz_notatki() {
    let login = JSON.parse(localStorage.getItem("login"))
    let url = `http://localhost:3000/pokaz-notatki/${login}`
    let response = await fetch(url)
    let dane = await response.json()
    let notatkiDiv = document.getElementById("notatki")
    notatkiDiv.innerHTML = ""
    let table = document.createElement("table")
    table.innerHTML = `<h3>Twoje notatki</h3>
     <table>
                <tr>
                    <td>
                        treść notatki
                    </td>
                    <td>
                        zmień treść notatki
                    </td>
                </tr>
            </table>`
    for (let i = 0; i < dane.length; i++) {

        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let zmienbtn = document.createElement("button")
        let usunbtn = document.createElement("button")
        usunbtn.innerText = "usuń notatkę"
        zmienbtn.innerText = "zmien treść notatki"
        td.innerText = dane[i].tresc
        zmienbtn.addEventListener("click", async () => {
            let id = dane[i].id_notatki
            let nowatresc = prompt("Podaj nową treść notatki:")
            if (nowatresc) {
                let url = `http://localhost:3000/zmien-notatke/${id}/${nowatresc}`
                let response = await fetch(url)
                let dane = await response.json()
                if (dane.affectedRows > 0) {
                    alert("Notatka zosatała zmieniona")
                } else {
                    alert("Nie udało się zmienić notatki")
                }
                pokaz_notatki()
            }
        })
        usunbtn.addEventListener("click", async () => {
            let id = dane[i].id_notatki
            let url = `http://localhost:3000/usun-notatke/${id}`
            let response = await fetch(url)
            let wynik = await response.json()
            if (wynik.affectedRows > 0) {
                alert("Notatka została usunięta")
                pokaz_notatki()
            } else {
                alert("Nie udało się usunąć notatki")
            }
        })
        table.appendChild(tr)
        tr.appendChild(td)
        tr.appendChild(zmienbtn)
        tr.appendChild(usunbtn)
    }
    notatkiDiv.appendChild(table)
}
let ustawienia = document.getElementById('kolo')
ustawienia.addEventListener("click", () => {
    let divUstawienia = document.createElement("div")
    document.body.appendChild(divUstawienia)
    divUstawienia.setAttribute("id", "ustawienia")
    divUstawienia.innerHTML = `
        <h2>Ustawienia</h2>
        <input type="text"  id="bg-color" placeholder="zmien kolor tła">
        <input type="text"  id="main-color" placeholder="zmien główny kolor tła">
        <input type="text"  id="font-color" placeholder="zmien kolor czcionki">
        <input type="text"  id="font-size" placeholder="zmien rozmiar czcionki">
        <input type="text"  id="font-family" placeholder="zmien czcionke"> 
        <button id="zapisz-ustawienia">Zapisz ustawienia</button>
        <h2>Zmien login</h2>
        <input type="text"  id="loginChange" placeholder="podaj stary login" required>
        <input type="text"  id="loginChange2" placeholder="podaj nowy login" required> 
        <button id="login">Zmień login</button>  
        <h2>Zmien haslo</h2>
        <input type="password" id="passwordChange" placeholder="Podaj stare hasło" required>
        <input type="password" id="passwordChange2" placeholder="Podaj nowe hasło " required>
        <button id="haslo">Zmień hasło</button>
    `
    let zapiszUstawienia = document.getElementById("zapisz-ustawienia")
    zapiszUstawienia.addEventListener("click", () => {
        let bgColor = document.getElementById("bg-color").value
        let mainColor = document.getElementById("main-color").value
        let fontColor = document.getElementById("font-color").value
        let fontSize = document.getElementById("font-size").value
        let fontFamily = document.getElementById("font-family").value
        if (bgColor) {
            document.body.style.backgroundColor = bgColor
        }
        if (mainColor) {
            document.getElementById('main-left').style.backgroundColor = mainColor
        }
        if (fontColor) {
            document.body.style.color = fontColor
            document.getElementById('container').style.color = fontColor
            document.getElementById("notatka").style.color = fontColor
        }
        if (fontSize) {
            document.body.style.fontSize = fontSize + "px"
            document.getElementById('main-left').style.fontSize = fontSize + "px"
        }
        if (fontFamily) {
            document.body.style.fontFamily = fontFamily
            document.getElementById("notatka").style.fontFamily = fontFamily
        }

    })
    let loginBtn = document.getElementById('login')
    loginBtn.addEventListener("click", async () => {
        let oldlogin = document.getElementById("loginChange").value
        let newlogin = document.getElementById("loginChange2").value
        let url = `http://localhost:3000/zmien-login/${oldlogin}/${newlogin}`
        let response = await fetch(url)
        let dane = await response.json()
        if (dane.affectedRows > 0) {
            alert("Login został zmieniony")
            localStorage.setItem("login", JSON.stringify(newlogin))
        } else {
            alert("Nie udało się zmienić loginu")
        }
    })
    let hasloBtn = document.getElementById('haslo')
    hasloBtn.addEventListener("click", async () => {
        let oldPassword = document.getElementById("passwordChange").value
        let newPassword = document.getElementById("passwordChange2").value
        let login = JSON.parse(localStorage.getItem("login"))
        let url = `http://localhost:3000/zmien-haslo/${login}/${oldPassword}/${newPassword}`
        let response = await fetch(url)
        let dane = await response.json()
        if (dane.affectedRows > 0) {
            alert("Hasło zostało zmienione")
        } else {
            alert("Nie udało się zmienić hasła")
        }
    })
})
async function pokaz_notatki_uzytkownika() {
    let login = document.getElementById('login-notatki').value
    let notatkiDiv = document.getElementById("notatki")
    notatkiDiv.innerHTML = ""
    let url = `http://localhost:3000/pokaz-notatki/${login}`
    let response = await fetch(url)
    let dane = await response.json()
    if (dane.length === 0) {
        notatkiDiv.innerHTML = "<h3>Brak notatek dla tego użytkownika</h3>"
        return
    }
    let table = document.createElement("table")
    table.innerHTML = `<h3>Twoje notatki</h3>
     <table>
                <tr>
                    <td>
                        treść notatki
                    </td>
                    <td>
                        zmień treść notatki
                    </td>
                </tr>
            </table>`
    for (let i = 0; i < dane.length; i++) {

        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let zmienbtn = document.createElement("button")
        let usunbtn = document.createElement("button")
        usunbtn.innerText = "usuń notatkę"
        zmienbtn.innerText = "zmien treść notatki"
        td.innerText = dane[i].tresc
        zmienbtn.addEventListener("click", async () => {
            let id = dane[i].id_notatki
            let nowatresc = prompt("Podaj nową treść notatki:")
            if (nowatresc) {
                let url = `http://localhost:3000/zmien-notatke/${id}/${nowatresc}`
                let response = await fetch(url)
                let dane = await response.json()
                if (dane.affectedRows > 0) {
                    alert("Notatka zosatała zmieniona")
                } else {
                    alert("Nie udało się zmienić notatki")
                }
                pokaz_notatki_uzytkownika()
            }
        })
        usunbtn.addEventListener("click", async () => {
            let id = dane[i].id_notatki
            let url = `http://localhost:3000/usun-notatke/${id}`
            let response = await fetch(url)
            let wynik = await response.json()
            if (wynik.affectedRows > 0) {
                alert("Notatka została usunięta")
                pokaz_notatki_uzytkownika()
            } else {
                alert("Nie udało się usunąć notatki")
            }
        })
        table.appendChild(tr)
        tr.appendChild(td)
        tr.appendChild(zmienbtn)
        tr.appendChild(usunbtn)
    }
    notatkiDiv.appendChild(table)
}
async function usun_uzytkownika() {
    let login = document.getElementById('login-usun').value
    let url = `http://localhost:3000/usun-uzytkownika/${login}`
    let response = await fetch(url)
    let dane = await response.json()
    if (dane.affectedRows > 0) {
        alert("Użytkownik został usunięty")
        document.getElementById('login-usun').value = ""
    } else {
        alert("Nie udało się usunąć użytkownika")
    }
}