


let mysql = require('mysql2');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "blue_Major15",
    // database: "auction_db"
});


con.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE auction_db", function(err, result) {
         if(err) throw err;
        console.log("Database created");
    })
       
})
