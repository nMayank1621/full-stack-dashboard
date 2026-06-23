const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nmayank@1621",
  database: "dashboard_mysql"
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// Home Route
app.get("/", (req, res) => {
  res.send("Server Running");
});


// SIGNUP ROUTE
app.post("/signup", (req, res) => {

  const { first_name, last_name, email, password } = req.body;

  // Check duplicate email or name
  const checkSql =
    "SELECT * FROM users WHERE email=? OR (first_name=? AND last_name=?)";

  db.query(
    checkSql,
    [email, first_name, last_name],

    (err, result) => {

      if (err) {

        return res.status(500).json({
          message: err.message
        });

      }

      if (result.length > 0) {

        return res.status(400).json({
          message: "User already exists"
        });

      }

      const insertSql =
        "INSERT INTO users(first_name,last_name,email,password) VALUES(?,?,?,?)";

      db.query(
        insertSql,
        [first_name, last_name, email, password],

        (err, result) => {

          if (err) {

            return res.status(500).json({
              message: err.message
            });

          }

          res.status(200).json({
            message: "User Registered Successfully"
          });

        }

      );

    }

  );

});


// LOGIN ROUTE
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {

    if (err) {

      return res.status(500).json({
        message: err.message
      });

    }

    if (result.length > 0) {

      return res.status(200).json({

        message: "Login Success",

        user: result[0]

      });

    }

    return res.status(401).json({

      message: "Invalid Email or Password"

    });

  });

});


// START SERVER
app.listen(5000, () => {

  console.log("Server running on port 5000");

});