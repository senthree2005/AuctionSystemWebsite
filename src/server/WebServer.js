require('dotenv').config()
let mysql = require('mysql2');
const bcrypt = require('bcrypt')

const express = require('express')
const app = express()
const http = require('http')
const fs = require('fs')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require("cors")
const port = 3000
const corsOptions = {
    origin: ["http://localhost:5173"]
}
let refreshTokens = []



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



app.post('/api/auth/sign', async (req,res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const q = "INSERT INTO accounts (username,pass_word) VALUES (?,?)"

    con.query(q, [username, hashedPassword], (err, result)=> {
        if(err) return res.status(500).send(err);
        res.status(201).send("Data inserted successfully")
    })
})


app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    const q = "SELECT * FROM accounts WHERE username = ?";

    con.query(q, [username], async (err, rows) => {
        if (err) return res.status(500).send(err);

        if (rows.length === 0) {
            return res.status(404).send("User not found");
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.pass_word);

        if (!isMatch) {
            return res.status(401).send("Invalid credentials");
        }
        const accessToken = generateAccessToken(username)
        const refreshToken =jwt.sign(username, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.username
            }
        });
    });
});

app.get('/posts', authenticateToken, (req, res) => {
  console.log("Reach")
//   res.redirect("/posts")
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
app.delete('/api/auth/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}


app.listen(port, () => {
    console.log("Server started on port " + port)
})