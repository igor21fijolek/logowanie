const express  = require('express')
const cors = require('cors')
const mysql = require('mysql')
const md5 = require('md5')

const app  = express()

app.use(cors())

let con = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password:'',
    database:'cw'

})

con.connect((err)=>{
    if(!err){
        console.log('poloczono z baza');
    }else{
        console.log('nie poloczono z baza');
    }
})



app.get("/rejestracja/:login/:haslo", (req,res)=>{
    let login = req.params.login
    let haslo = req.params.haslo

    const sql = `select login from osoby where login = '${login}'`
    con.query(sql, (err, result)=>{
        if(err) throw err
        if(result.length > 0){
            res.status(302)
            res.json({error: 'login juz istnieje'})
        }else{
            const sql = `INSERT into osoby (login, haslo, uprawnienia) VALUES ('${login}', '${md5(haslo)}', 'user')`
            con.query(sql,(err, result)=>{
                if(err) throw err
                res.json(result)
            })
        }
    })
})


app.listen(3000, () =>{
    console.log("dziala");
})