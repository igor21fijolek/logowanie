const  express  = require('express')
const  cors = require('cors')
const mysql  = require('mysql')
const md5 = require('md5')

let app = express()

app.use(cors())

let con =  mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'notatnik'
})

app.get('/logowanie/:login/:haslo', (req, res) => {
    let login = req.params.login;
    let haslo = req.params.haslo;
     let sql = `SELECT * FROM uzytkownicy WHERE login = '${login}' AND password = '${md5(haslo)}'`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error(err)
        }
        if (result.length > 0) {
            res.json(result)
        }
})
})

app.get('/rejestracja/:login/:haslo', (req,res)=>{
    let login = req.params.login
    let haslo = req.params.haslo

    let uprawnienia = login === 'admin' ? "admin" : "user"

    let sql = `select login from uzytkownicy where login = '${login}'`
    con.query(sql, (err,result)=>{
        if(err) throw err
        if(result.length>0){
            res.status(302)
            res.json('login njest juz w bazie danych')
            console.log('login zajety');
        }else{
            let sql = `insert into uzytkownicy values('${login}', '${md5(haslo)}', '${uprawnienia}')`
            con.query(sql, (err,result)=>{
                console.log(result)
                res.status(200)
                res.json('zarejestrowano')
            })
        }
    })
})


app.get('/dodaj-notatke/:tresc/:login', (req,res)=>{
    let tresc = req.params.tresc
    let login = req.params.login

    let sql = `INSERT into notatki (tresc, login_uzytkownika) VALUES ('${tresc}', '${login}');`
    con.query(sql, (err, result)=>{
        if(err) throw err
       res.status(200).json({ status: 200, message: 'dodano notatke' });
    })
})

app.get('/pokaz-notatki/:login', (req, res) => {
    let login  = req.params.login
    let sql = `select * from notatki where login_uzytkownika = '${login}'`
    con.query(sql, (err, result) => {
        if (err) throw err
        res.status(200).json(result)
    })
})

app.get('/zmien-notatke/:id/:tresc', (req, res) => {
    let id = req.params.id
    let tresc = req.params.tresc

    let sql = `UPDATE notatki SET tresc = '${tresc}' WHERE id_notatki = ${id}`
    con.query(sql, (err, result) => {
        if(err)throw err
        res.send(result)
    })
})

app.get('/zmien-login/:stary/:nowy', (req,res)=>{
    let stary = req.params.stary
    let nowy = req.params.nowy

    let sql = `UPDATE uzytkownicy SET login = '${nowy}' WHERE login = '${stary}'`
    con.query(sql, (err, result)=>{
        if(err) throw err
        res.send(result)
    })
})
app.get('/zmien-haslo/:login/:stare/:nowe', (req, res) => {
    let login = req.params.login
    let stare = req.params.stare
    let nowe = req.params.nowe

    let sql = `UPDATE uzytkownicy SET password = '${md5(nowe)}' WHERE login = '${login}' AND password = '${md5(stare)}'`
    con.query(sql, (err, result) => {
        if(err) throw err
        res.send(result)
    })
})

con.connect((err)=>{
    if(err){
        console.log("nie poloczono");
    }else{
        console.log('poloczono');
    }
})

app.listen(3000,()=>{
    console.log('dziala')
})