const { query, tableNames } = require('./constants/queary');
const { endpoints } = require('./constants/endpoints');
const { errorMessages, successMessages } = require('./constants/messages');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql2")
const cors = require('cors');
const { reviews, users, tags, comments, likes, categories } = query;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001,() => {
  console.log("server running on port 3001")
});

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "db",
  password:'4321'
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
    db.query(tags.insert, (error, result) => {
      if (error) {
        console.log(errorMessages.internal(tableNames.tags), error);
      } else {
        console.log(successMessages.entityAdded(tableNames.tags));
      }
    });
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

db.query(categories.create, (error, result) => {
  if (error) {
    console.log(errorMessages.tableCreation(tableNames.categories), error);
  } else {
    console.log(successMessages.tableCreation(tableNames.categories));

    db.query(categories.insert, (error, result) => {
      if (error) {
        console.log(errorMessages.internal(tableNames.categories), error);
      } else {
        console.log(successMessages.entityAdded(tableNames.categories));
      }
    });
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

app.get(endpoints.users, (req, res) => {
  db.query(users.getAll, (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json(result);
    }
  })
})

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
// Register //
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
// --- //

// Login //
app.post(endpoints.login, (req, res) => {
  const { name, email,password } = req.body;
  db.query(users.getByAllKeys, [name, email, password], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      if (result.length === 0) {
        res.status(401).json({ error: errorMessages.invalidCreds });
      } else {
        res.status(200).json({
          id: result[0].ID,
          name,
          role: result[0].role,
          message: successMessages.login
        });
      }
    }
  });
});
// --- //
// Reviews //
app.post(endpoints.reviews, (req, res) => {
  const { reviewName, category, reviewText , imageSource, rating, userID } = req.body;
  console.log(reviewName, category, reviewText , imageSource, rating, userID)
  db.query(reviews.insert, [reviewName, category, reviewText , imageSource, rating, userID], (error, result) => {
    if (error) {
      console.log(error)
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
// --- //
// Comments //
app.get(endpoints.comments, (req, res) => {
  db.query(comments.getAll, (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json(result);
    }
  })
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

app.put(endpoints.comments, (req, res) => {
  const { commentID, comment } = req.body;
  db.query(comments.updateById, [comment, commentID], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json({ message: successMessages.entityUpdated('Comment') });
    }
  });
});

app.delete(endpoints.comments, (req, res) => {
  const { commentID } = req.body;
  db.query(comments.deleteById, [commentID], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json({ message: successMessages.entityDeleted('Comment') });
    }
  });
});
// --- //

// Likes //
app.post(endpoints.likes, (req, res) => {
  const { reviewID, userID } = req.body;

  db.query(likes.insert, [reviewID, userID], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      db.query(likes.getAllByIds, [reviewID, userID], (error, result) => {
        if (error) {
          res.status(500).json({ error: errorMessages.internal });
        } else {
          res.status(200).json({ message: successMessages.entityFound('Likes'), likes: result });
        }
      })
    }
  });
});

app.get(endpoints.likes, (req, res) => {
  db.query(likes.getAll, (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json(result);
    }
  })
});

app.delete(endpoints.likes, (req, res) => {
  const { likeID } = req.body;
  
  db.query(likes.deleteById, [likeID], (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json({ message: successMessages.entityDeleted('Like') });
    }
  });
});
// --- //
// Tags //
app.get(endpoints.tags, (req, res) => {
  db.query(tags.getAll, (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json(result);
    }
  });
});
// --- ///
// Categories //
app.get(endpoints.categories, (req, res) => {
  db.query(categories.getAll, (error, result) => {
    if (error) {
      res.status(500).json({ error: errorMessages.internal });
    } else {
      res.status(200).json(result);
    }
  });
});
// --- //