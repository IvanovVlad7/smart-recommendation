const tableNames = {
    reviews: 'reviews',
    users: 'users',
    tags: 'tags',
    comments: 'comments',
    likes: 'likes'
};

const query = {
    [tableNames.reviews]: {
        create: `
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
        `,
        getAll: "SELECT * FROM reviews",
        insert: "INSERT INTO reviews (reviewName, targetName, category, reviewText, imageSource, rating, userID) VALUES (?,?,?,?,?,?,?)"
    },
    [tableNames.users]: {
        create: `
            CREATE TABLE IF NOT EXISTS users (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            role VARCHAR(255)
            )
        `,
        getAll: "SELECT * FROM users",
        getByEmail: "SELECT * FROM users WHERE email = ?",
        getByAllKeys: "SELECT * FROM users WHERE name = ? AND email = ? AND password = ?",
        insert: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    },
    [tableNames.tags]: {
        create: `
            CREATE TABLE IF NOT EXISTS tags (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                reviewID INT,
                tagText TEXT,
                FOREIGN KEY (reviewID) REFERENCES reviews(ID)
            )
        `,
        getAll: "SELECT * FROM tags",
        insert: "INSERT INTO tags (reviewID, tagText) VALUES (?, ?)",
    },
    [tableNames.comments]: {
        create: `
            CREATE TABLE IF NOT EXISTS comments (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            reviewID INT,
            commentText TEXT,
            userID INT,
            FOREIGN KEY (reviewID) REFERENCES reviews(ID),
            FOREIGN KEY (userID) REFERENCES users(ID)
            )
        `,
        getAll: "SELECT * FROM comments",
        insert: "INSERT INTO comments (reviewID, commentText, userID) VALUES (?, ?, ?)",
        updateById: "UPDATE comments SET commentText = ? WHERE ID = ?",
        deleteById: "DELETE FROM comments WHERE ID = ?"
    },
    [tableNames.likes]: {
        create: `
            CREATE TABLE IF NOT EXISTS likes (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            reviewID INT,
            userID INT,
            FOREIGN KEY (reviewID) REFERENCES reviews(ID),
            FOREIGN KEY (userID) REFERENCES users(ID)
            )
        `,
        getAll: "SELECT * FROM likes",
        insert: "INSERT INTO likes (reviewID, userID) VALUES (?, ?)",
        deleteById: "DELETE FROM comments WHERE ID = ?"
    }
};

module.exports = {
    query,
    tableNames
}