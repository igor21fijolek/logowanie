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

app.get('/logowanie/:login/:haslo', (req,params)=>{
    let login = req.params.login
    let haslo = req.params.haslo

    let sql = `select * from uzytkownicy where login = '${login}'`
    con.query(sql, (err,result)=>{
        console.log(result);
        res.send('zalogowano')
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
                res.send('zarejestrowano')
            })
        }
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