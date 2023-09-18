const { query, tableNames } = require('./constants/queary');
const { endpoints } = require('./constants/endpoints');
const { errorMessages, successMessages } = require('./constants/messages');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql2")
const cors = require('cors');
const { reviews, users, tags, comments, likes } = query;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.listen(3001,() => {
  console.log("server running on port 3001")
});

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "db",
})

db.query(reviews.create, (error, result) => {
  if (error) {
    console.log(errorMessages.tableCreation(tableNames.reviews), error);
  } else {
    console.log(successMessages.tableCreation(tableNames.reviews));
  }
});

db.query(users.create, (error, result) => {
  if (error) {
    console.log(errorMessages.tableCreation(tableNames.users), error);
  } else {
    console.log(successMessages.tableCreation(tableNames.users));
  }
});

db.query(tags.create, (error, result) => {
  if (error) {
    console.log(errorMessages.tableCreation(tableNames.tags), error);
  } else {
    console.log(successMessages.tableCreation(tableNames.tags));
  }
});

db.query(comments.create, (error, result) => {
  if (error) {
    console.log(errorMessages.tableCreation(tableNames.comments), error);
  } else {
    console.log(successMessages.tableCreation(tableNames.comments));
  }
});

db.query(likes.create, (error, result) => {
  if (error) {
    console.log(errorMessages.tableCreation(tableNames.likes), error);
  } else {
    console.log(successMessages.tableCreation(tableNames.likes));
  }
});

app.get(endpoints.reviews, async (req, res) => {
  try {
    const resultReviews = await queryDatabase(reviews.getAll);
    
    res.status(200).json({
      reviews: resultReviews
    });
  } catch (error) {
    res.status(500).json({ error: errorMessages.internal });
  }
});

function queryDatabase(sqlQuery) {
  return new Promise((resolve, reject) => {
    db.query(sqlQuery, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function addTags(reviews, tags) {
  const arr = []
  reviews.forEach((g) => {
    const review = { ...g, tags: [] };
    tags.forEach((s) => {
      if (s.reviewID === g.ID) {
        review.tags.push(s);
      }
    });

    arr.push(review)
  });

  return arr
}

function addComments(reviews, comments) {
  const reviewsWithComments = reviews.map((review) => {
    const reviewCopy = { ...review, comments: [] };
    comments.forEach((comment) => {
      if (comment.reviewID === review.ID) {
        reviewCopy.comments.push(comment);
      }
    });
    return reviewCopy;
  });
  return reviewsWithComments;
}

function addLikes(reviews, likes) {
  const reviewsWithLikes = reviews.map((review) => {
    const reviewCopy = { ...review, likes: [] };
    likes.forEach((like) => {
      if (like.reviewID === review.ID) {
        reviewCopy.likes.push(like);
      }
    });
    return reviewCopy;
  });
  return reviewsWithLikes;
}


app.post(endpoints.register, (req, res) => {
  const { name, email, password } = req.body;
  db.query(users.getByEmail, [email], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      if (result.length > 0) {
        res.status(400).json({ message: errorMessages.userExistsAlready });
      } else {
        const sqlInsert = users.insert;
        db.query(sqlInsert, [name, email, password], (error, result) => {
          if (error) {
            console.log("Error:", error);
            res.status(500).json({ error: errorMessages.internal });
          } else {
            console.log("Registered:", result);
            res.status(200).json({ id: result.insertId, name, message: successMessages.registration });
          }
        });
      }
    }
  });
});

app.post(endpoints.login, (req, res) => {
  const { name, email,password } = req.body;
  db.query(users.getByAllKeys, [name, email, password], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      if (result.length === 0) {
        res.status(401).json({ error: errorMessages.invalidCreds });
      } else {
        res.status(200).json({ id: result.insertId, name, message: successMessages.login });
      }
    }
  });
}); 

app.post(endpoints.reviews, (req, res) => {
  const { reviewName, targetName, category, reviewText , imageSource, rating, userID } = req.body;
  db.query(reviews.insert, [reviewName, targetName, category, reviewText , imageSource, rating, userID], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json({ message: successMessages.entityAdded('Review') });
    }
  });
});

app.get(endpoints.reviews, (req, res) => {
  db.query(reviews.getAll, (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json(result);
    }
  });
});

app.post(endpoints.comments, (req, res) => {
  const { reviewID, commentText,  userID } = req.body;
  db.query(comments.insert, [reviewID, commentText, userID], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json({ message: successMessages.entityAdded('Comment') });
    }
  });
});


app.post(endpoints.likes, (req, res) => {
  const { reviewID,  userID } = req.body;
  db.query(likes.insert, [reviewID,  userID], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json({ message: successMessages.entityAdded('Likes') });
    }
  });
});


app.post(endpoints.tags, (req, res) => {
  const { reviewID, tagText} = req.body;
  db.query(tags.insert, [reviewID, tagText], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json({ message: successMessages.entityAdded('Tag') });
    }
  });
});


app.get(endpoints.tags, (req, res) => {
  db.query(tags.getAll, (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json(result);
    }
  });
});