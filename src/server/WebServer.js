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
    origin: ["http://localhost:5173"],
    credentials: true 
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

app.get('/display_item', async (req, res)=> {
    const q = 'SELECT * FROM item'
    con.execute(q, (err,result) => {
        console.log("Result:", result)
        res.json(result)
    })
})

// app.post('/place_bid', authenticateToken, async(req, res)=> {
//     const {product_id,bid,bidder} = req.body;
//     // const q = 'INSERT INTO transactionbids (product_id, highest_bid, bidder) VALUES (?,?,?)'
//     const q = 'START TRANSACTION; INSERT INTO item (starting'
//     con.query(q, [product_id, bid, bidder], (err,result)=> {
//         if (err) return res.status(500).send(err);
//         con.query()
//         res.status(201).send({ message: "Bid Inserted", result });
//     })
// })

app.post('/place_bid', authenticateToken, (req, res) => {
  const { product_id, bid, bidder } = req.body;

  con.beginTransaction((err) => {
    if (err) return res.status(500).send(err);

    // 1. Insert the bid
    const insertBid = `
      INSERT INTO transactionbids (product_id, highest_bid, bidder) VALUES (?, ?, ?)`;

    con.query(insertBid, [product_id, bid, bidder], (err, result) => {
      if (err) {
        return con.rollback(() => res.status(500).send(err));
      }

      // 2. Update the item starting_bid
      const updateItem = `UPDATE item SET starting_bid = ? WHERE product_id = ?`;

      con.query(updateItem, [bid, product_id], (err) => {
        if (err) {
          return con.rollback(() => res.status(500).send(err));
        }

        // 3. Commit transaction
        con.commit((err) => {
          if (err) {
            return con.rollback(() => res.status(500).send(err));
          }

          res.status(201).send({
            message: "Bid placed and item updated",
            transaction_id: result.insertId
          });
        });
      });
    });
  });
});

app.post('/create_item', authenticateToken, async (req, res) => {
  const { product_name, product_description, deadline_date, starting_bid, minimum_bid, phone_number } = req.body;

  const seller_username = req.user.username;

  const q = `INSERT INTO item (product_name, product_description, deadline_date, starting_bid, minimum_bid, seller_username, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [product_name, product_description, deadline_date, starting_bid, minimum_bid, seller_username, phone_number];

  console.log("Seller username being inserted:", values[5]);

  con.query(q, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: "Data inserted", result });
  });
});

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
        const accessToken = generateAccessToken(user.username);
        const refreshToken = jwt.sign(user.username, process.env.REFRESH_TOKEN_SECRET);        refreshTokens.push(refreshToken)
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

    res.status(200).json({
        message: "Access granted to protected route",
        user: req.user
    });
})


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "No token provided." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token." });

    req.user = user; // ✅ now user.username is a string
    next();
  });
}
app.delete('/api/auth/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

function generateAccessToken(user) {
  return jwt.sign({username: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}


app.listen(port, () => {
    console.log("Server started on port " + port)
})