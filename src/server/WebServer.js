// import {database} from './DatabaseServer';

let mysql = require('mysql2');
const bcrypt = require('bcrypt')

const express = require('express')
const app = express()
const http = require('http')
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require("cors")
const port = 3000
const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions));
app.use(express.json())

let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "blue_Major15"
})

function errorPrompt(err, result, err_msg) {
    if(err) throw err;
    console.log(error_msg);
}

con.connect(function(err) {
    if(err) throw err;

    con.query("USE auction_db", function(err, result) {
        if (err) throw err;
        console.log("Database selected");
    });
});

// const server = createServer((req,res)=>{
//     res.writeHead(200, {'Content-Type': 'type/html'})
//     fs.readFile('/index.html')
// })


app.get("/api", (req, res)=> {
    
    res.json({fruits: ["apple", "orange", "banana"]})
})

app.post('/api/auth/sign', async (req,res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const q = "INSERT INTO accounts (username,pass_word) VALUES (?,?)"

    con.query(q, [username, hashedPassword], (err, result)=> {
        if(err) return res.status(500).send(err);
        res.status(201).send("Data inserted successfully")
    })
})

app.listen(port, () => {
    console.log("Server started on port " + port)
})