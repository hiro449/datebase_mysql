/* const http = require('http'); */
const mysql = require('mysql2');
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

/* const index = fs.readFileSync('./confirm.ejs', 'utf-8'); */

  const port = 8080;

  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({ extended: true }));

  const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'konhiro1',
    database: 'des'
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
    const sql = "select * from users"
    con.query(sql, function (err, result, fields) {  
    if (err) throw err;  
    console.log(result)
    });
  });
  
  app.use(express.static('mongo'));

  app.get('/', (req, res) => {
    const sql = "select * from users";
    con.query(sql, function (err, result, fields) {  
    if (err) throw err;
    res.render('index',{users : result});
    });
  });

  app.get('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM users WHERE id = ?";
    con.query(sql,[req.params.id],function(err,result,fields){
      if (err) throw err;
      console.log(result)
      res.redirect('/');
    })
  });

  app.get('/edit/:id',(req,res)=>{
    const sql = "SELECT * FROM users WHERE id = ?";
    con.query(sql,[req.params.id],function (err, result, fields) {  
      if (err) throw err;
      res.render('edit',{user : result});
      });
  });

  app.post('/', (req, res) => {
    const sql = "INSERT INTO users SET ?"
  
    con.query(sql,req.body,function(err, result, fields){
      if (err) throw err;
      console.log(result);
      res.redirect('/');
  
    });
  });

  app.post('/update/:id',(req,res)=>{
    const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
    con.query(sql,req.body,function (err, result, fields) {  
      if (err) throw err;
      console.log(result);
      res.redirect('/');
      });
  });

  app.listen(port, () => 
  console.log(`Example app listening on port localhost:${port}`))

 

console.log("今さらながら、ようこそ");




