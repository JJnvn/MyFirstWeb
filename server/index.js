const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mysql = require("mysql2/promise");

app.use(bodyparser.json());

const users = [];
let counter = 1;

// const host = 'localhost'
const port = 8000;

app.get("/testdb", (req, res) => {
  mysql
    .createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "tutorial",
    })
    .then((conn) => {
      // this is promise
      conn
        .query("SELECT * FROM users") // sql code in db
        .then((results) => {
          console.log(results);
          res.json(results[0]);
        })
        .catch((error) => {
          console.error("Error fetching users:", error.message);
          res.status(500).json({ error: "Error fetching users" });
        });
    });
});

// same as abobve using async
app.get("/testdb-new", async (req, res) => {
  // change from then to await
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "yourdb",
  });

  try {
    let results = await conn.query("SELECT * FROM users");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// path = '/'
app.get("/users", (req, res) => {
  const filteredUsers = users.map((user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.firstName + " " + user.lastName,
    };
  });
  res.send(filteredUsers);
});

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  let selectedIndex = users.findIndex((user) => user.id == id);
  res.send(users[selectedIndex]);
});

app.post("/users", (req, res) => {
  let user = req.body;
  user.id = counter;
  counter += 1;
  users.push(user);
  res.json({
    message: "add ok",
    user: user,
  });
});

app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;

  let selectedIndex = users.findIndex((user) => user.id == id);
  // users[selectedIndex] = updateUser // this will delete the id key
  users[selectedIndex].firstName =
    updateUser.firstName || users[selectedIndex].firstName;
  users[selectedIndex].lastName =
    updateUser.lastName || users[selectedIndex].lastName;
  users[selectedIndex].age = updateUser.age || users[selectedIndex].age;
  users[selectedIndex].gender =
    updateUser.gender || users[selectedIndex].gender;
  // res.send(selectedIndex + '')
  res.json({
    message: "update user complete",
    data: {
      user: updateUser,
      indexUpdate: selectedIndex,
    },
  });
});

app.patch("/users/:id", (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;

  let selectedIndex = users.findIndex((user) => user.id == id);
  if (updateUser.firstName) {
    users[selectedIndex].firstName = updateUser.firstName;
  }
  if (updateUser.lastName) {
    users[selectedIndex].lastName = updateUser.lastName;
  }
  if (updateUser.age) {
    users[selectedIndex].age = updateUser.age;
  }
  if (updateUser.gender) {
    users[selectedIndex].gender = updateUser.gender;
  }

  res.json({
    message: "patch user complete",
    data: {
      user: updateUser,
      indexUpdate: selectedIndex,
    },
  });
});

app.delete("/users/:id", (req, res) => {
  let id = req.params.id;

  let selectedIndex = users.findIndex((user) => user.id == id);

  // delete users[selectedIndex]
  users.splice(selectedIndex, 1);

  res.json({
    message: "delete complete",
    indexDeleted: selectedIndex,
  });
});

// start the server
app.listen(port, (req, res) => {
  console.log(`http server run at ${port}`);
});
