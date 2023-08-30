const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql2")
const cors = require('cors');


const db = mysql.createPool({
  host:"localhost",
  user:"root",
  password:"4321",
  database:"db",
})

db.query(`
  CREATE TABLE IF NOT EXISTS reviews (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    reviewName VARCHAR(255),
    targetName VARCHAR(255),
    category VARCHAR(255),
    reviewText TEXT,
    imageSource VARCHAR(255),
    rating INT,
    FOREIGN KEY (userID) REFERENCES users(ID)
  )
`, (error, result) => {
  if (error) {
    console.log("Ошибка при создании таблицы reviews:", error);
  } else {
    console.log("Таблица reviews создана");
  }
});

db.query(`
  CREATE TABLE IF NOT EXISTS likes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    reviewID INT,
    userID INT,
    FOREIGN KEY (reviewID) REFERENCES reviews(ID),
    FOREIGN KEY (userID) REFERENCES users(ID)
  )
`, (error, result) => {
  if (error) {
    console.log("Ошибка при создании таблицы likes:", error);
  } else {
    console.log("Таблица likes создана");
  }
});

db.query(`
  CREATE TABLE IF NOT EXISTS comments (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    reviewID INT,
    commentText TEXT,
    userID INT,
    FOREIGN KEY (reviewID) REFERENCES reviews(ID),
    FOREIGN KEY (userID) REFERENCES users(ID)
  )
`, (error, result) => {
  if (error) {
    console.log("Ошибка при создании таблицы comments:", error);
  } else {
    console.log("Таблица comments создана");
  }
});

db.query(`
  CREATE TABLE IF NOT EXISTS users (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(255)
  )
`, (error, result) => {
  if (error) {
    console.log("Ошибка при создании таблицы users:", error);
  } else {
    console.log("Таблица users создана");
  }
});

db.query(`
  CREATE TABLE IF NOT EXISTS tags (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    reviewID INT,
    tagText TEXT,
    FOREIGN KEY (reviewID) REFERENCES reviews(ID)
  )
`, (error, result) => {
  if (error) {
    console.log("Ошибка при создании таблицы tags:", error);
  } else {
    console.log("Таблица tags создана");
  }
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3001,() => {
  console.log("server running on port 3001")
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const sqlCheckUser = "SELECT * FROM users WHERE email = ?";
  db.query(sqlCheckUser, [email],(error,result) => {
  if(error){
    console.log("Error:",error);
    res.status(500).json({error: "Internal Server Error" });
  } else {
    if(result.length > 0){
      res.status(400).json({error:"User with the same email already exists" });
    } else {
      const sqlInsert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(sqlInsert, [name, email, password], (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Registered:", result);
      res.status(200).json({ message: "Registration successful" });
    }
  });
  }}
  })
});

app.post("/login", (req, res) => {
  const { name, email,password } = req.body;
  const sqlSelect = "SELECT * FROM users WHERE name = ? AND email = ? AND password = ?";
  db.query(sqlSelect, [name, email, password], (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        console.log("Logged in:", result);
        res.status(200).json({ message: "Login successful" });
      }
    }
  });
}); 

app.post("/reviews", (req, res) => {
  const { reviewName, targetName, category, reviewText , imageSource, rating, authorID } = req.body;
  const sqlInsert = "INSERT INTO reviews (reviewName, targetName, category, reviewText, imageSource, rating, userID) VALUES (?,?,?,?,?,?,?)";
  db.query(sqlInsert, [reviewName, targetName, category, reviewText , imageSource, rating, authorID], (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Review added:", result);
      res.status(200).json({ message: "Review added successfully" });
    }
  });
});

app.get("/reviews", (req, res) => {
  const sqlSelect = "SELECT * FROM reviews";
  db.query(sqlSelect, (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Reviews data:", result);
      res.status(200).json(result);
    }
  });
});



app.post("/comments", (req, res) => {
  const { reviewID, commentText, authorID } = req.body;
  const sqlInsert = "INSERT INTO comments (reviewID, commentText, userID) VALUES (?, ?, ?)";
  db.query(sqlInsert, [reviewID, commentText, authorID], (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Comment added:", result);
      res.status(200).json({ message: "Comment added successfully" });
    }
  });
});


app.post("/likes", (req, res) => {
  const { reviewID, userID } = req.body;
  const sqlInsert = "INSERT INTO likes (reviewID, userID) VALUES (?, ?)";
  db.query(sqlInsert, [reviewID, userID], (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Like added:", result);
      res.status(200).json({ message: "Like added successfully" });
    }
  });
});


app.post("/tags", (req, res) => {
  const { reviewID, tagText} = req.body;
  const sqlInsert = "INSERT INTO tags (reviewID, tagText) VALUES (?, ?)";
  db.query(sqlInsert, [reviewID, tagText], (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Tag added:", result);
      res.status(200).json({ message: "Tag added successfully" });
    }
  });
});


app.get("/tags", (req, res) => {
  const sqlSelect = "SELECT * FROM tags";
  db.query(sqlSelect, (error, result) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Tags data:", result);
      res.status(200).json(result);
    }
  });
});


// 1. Create tables when there are none at first launch; +
// 2. Handle comments (table, + endpoint (POST)); +
// 3. Handle likes (table + endpoints (POST)); +
// --- Up to 30th of August ---
// MAKE A COMMIT !!!!
// 4. Handle tags (table + endpoints (POST + GET))
// //// UI ///// //
// 1. Main Page (accessable for every user (authed and not authed))
//  1.1 Input (for getting reviews GET /reviews)
//  1.2 Create component for Review (ReviewCard);
//    1.2.1 Create component Tag;
//    1.2.2 Likes;
//    1.2.3 Comments; (create another small component);
//  1.3 Show reviews pretty;
// --- Up to 31th of August ---