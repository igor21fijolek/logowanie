let express = require('express');
let app = express();
let cors = require('cors');
let mysql = require('mysql');
app.use(cors());
let md5 = require('md5');

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


app.get("/logowanie/:login/:haslo", (req, res) => {
    let login = req.params.login
    let haslo = req.params.haslo

    console.log(`Hasło przed haszowaniem: ${haslo}`);
    console.log(`Hasło po haszowaniu (md5): ${md5(haslo)}`);

    const sql = `SELECT * from osoby where login = '${login}' and haslo = '${md5(haslo)}';`
    console.log(`Zapytanie SQL: ${sql}`)
    con.query(sql, (err, result) => {
        if (err) {
            console.error(err)
        }
        console.log(result)
        res.json(result)
    })
})


app.get("/rejestracja/:login/:haslo", (req, res) => {
    let login = req.params.login;
    let haslo = req.params.haslo;

    console.log(`Hasło przed haszowaniem: ${haslo}`);
    console.log(`Hasło po haszowaniu (md5): ${md5(haslo)}`);

    const sql = `select login from osoby where login = '${login}'`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.status(302);
            res.json({ error: 'login juz istnieje' });
        } else {
            const sql = `INSERT into osoby (login, haslo, uprawnienia) VALUES ('${login}', '${md5(haslo)}', 'user')`;
            console.log(`Zapytanie SQL: ${sql}`);
            con.query(sql, (err, result) => {
                if (err) throw err;
                res.json(result);
            });
        }
    });
});


app.listen(3000, () =>{
    console.log("dziala");
})