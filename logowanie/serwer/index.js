let express = require('express');
let app = express();
let cors = require('cors');
let mysql = require('mysql');
app.use(cors());
let md5 = require('md5');


let con = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'logowanie'
})

con.connect((err)=>{
    if(!err){
        console.log('polaczono z baza');
    }else{
        console.log('nie polaczono z baza');
    }
})


//logowanie
app.get('/logowanie/:login/:haslo', (req,res)=>{
    let login = req.params.login
    let haslo = req.params.haslo
    const sql = `select * from osoby where login = '${login}' and password = '${md5(haslo)}' `
    con.query(sql , (err,result)=>{
        if(err) throw err
        console.log(md5(haslo))
        res.json(result)
    })   
})

//rejstracja 
app.get('/rejestracja/:login/:haslo', (req,res)=>{
    let login = req.params.login
    let haslo = req.params.haslo

    const sql = `select login from osoby where login = '${login}' `
    con.query(sql , (err,result)=>{
        if(err) throw err

        if(result.length > 0){
            res.status(302)
            res.json({error: `login jest w bazie danych`})
        }else{
            const sql = `INSERT into osoby (login, password, uprawnienia) values ('${login}', '${md5(haslo)}', 'user')`
            con.query(sql , (err,result)=>{
                if(err) throw err
                res.json(result)
            })
        }
        console.log(md5(haslo))
    })   
})

app.listen(3000, () => {
    console.log('dziala')
})

