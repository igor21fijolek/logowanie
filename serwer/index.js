let express = require('express');
let app = express();
let cors = require('cors');
let mysql = require('mysql');
app.use(cors());

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
    let login = req.params.login;
    let haslo = req.params.haslo;

    const sql = `select * from osoby where login = '${login}' and password = '${haslo}' `;

    con.query(sql , (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    })
    
})

app.listen(3000, () => {
    console.log('dziala');
})

