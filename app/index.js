const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
// var createTablePeople = "DROP TABLE people";
var createTablePeople = "CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100), primary key (id))";
connection.query(createTablePeople)
connection.end()

app.get('/', (req,res) => {
    console.log(req.params)
    const name = "Paulo Bezerra";

    const connection = mysql.createConnection(config)
    const insertSql = `INSERT INTO people(name) values('${name}')`
    connection.query(insertSql)
    
    const query = `SELECT * FROM people`
    let html = '<h1>Full Cycle</h1>'

    connection.query(query, (err, result, fields) => {
        connection.end()
        if (err) throw err;
        
        html += "<ul>"

        JSON.parse(JSON.stringify(result)).forEach(row => {
            html += `<li>${row.id} - ${row.name}</li>`
        });

        html += "</ul>"
        res.send(html)
    });    
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})