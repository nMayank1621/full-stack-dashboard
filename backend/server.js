require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "dashboard_mysql",
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// In-memory storage for verification codes 
const verificationCodes = {};
app.get("/", (req, res) => {
  res.send("Server Running");
});

// Send verification code
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes[email] = code;
    console.log(`Verification code for ${email} is: ${code}`);
    res.status(200).json({ message: "Verification code sent! Check backend console for code." });
  });
});

// Verify code
app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;

  if (verificationCodes[email] === code) {
    res.status(200).json({ message: "Code verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid verification code" });
  }
});

// Reset password
app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const sql = "UPDATE users SET password=? WHERE email=?";

    db.query(sql, [hashedPassword, email], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      delete verificationCodes[email];

      res.status(200).json({
        message: "Password reset successfully",
      });
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// SIGNUP ROUTE
app.post("/signup", async (req, res) => {
  try {
    console.log("Signup request body:", req.body);
    const { name, email, password } = req.body;

    console.log("Received data - name:", name, "email:", email, "password length:", password ? password.length : 0);

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check if user already exists
    const checkSql = "SELECT * FROM users WHERE email=?";

    db.query(checkSql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        "INSERT INTO users(name,email,password) VALUES(?,?,?)";

      db.query(
        insertSql,
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          return res.status(201).json({
            message: "User Registered Successfully",
          });
        }
      );
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const user = result[0];

    // Check if password is bcrypt hash (starts with $2b$ or similar) or plaintext
    let match = false;
    if (user.password.startsWith("$2b$") || user.password.startsWith("$2a$") || user.password.startsWith("$2y$")) {
      // It's a bcrypt hash - compare normally
      match = await bcrypt.compare(password, user.password);
    } else {
      // It's plaintext - compare directly (for existing users)
      match = password === user.password;
      // Optional: Automatically update to bcrypt for next time!
      if (match) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateSql = "UPDATE users SET password=? WHERE id=?";
        db.query(updateSql, [hashedPassword, user.id], (updateErr) => {
          if (updateErr) console.log("Failed to update password to hash:", updateErr);
        });
      }
    }

    if (!match) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    return res.status(200).json({
      message: "Login Success",
      user,
    });
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});