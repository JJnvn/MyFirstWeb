const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const mysql = require("mysql2/promise");
const cors = require("cors");

app.use(bodyparser.json());
app.use(cors());

// const host = 'localhost'
const port = 8000;

const users = [];
let counter = 1;

let conn = null;

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "tutorial",
  });
};

const validateData = (userData) => {
  let errors = [];

  if (!userData.firstname) {
    errors.push("add your name");
  }
  if (!userData.lastname) {
    errors.push("add your lastname");
  }
  if (!userData.age) {
    errors.push("add your age");
  }
  if (!userData.gender) {
    errors.push("select your gender");
  }
  if (!userData.interest) {
    errors.push("select your interests");
  }
  if (!userData.description) {
    errors.push("add your description");
  }

  return errors;
};

app.get("/testdb-new", async (req, res) => {
  try {
    let results = await conn.query("SELECT * FROM users");
    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// path = '/'
app.get("/users", async (req, res) => {
  let results = await conn.query("SELECT * FROM users");
  res.json(results[0]);
});

app.get("/users/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await conn.query("SELECT * FROM users WHERE id = ?", id);
    console.log(result);
    if (result[0].length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result[0]);
  } catch {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    let data = req.body;

    const errors = validateData(data);
    if (errors.length > 0) {
      throw {
        message: "data incomplete from backend",
        errors: errors,
      };
    }

    const result = await conn.query("INSERT INTO users SET ?", data);
    const userId = result[0].insertId;
    res.status(201).json({ message: "User created successfully", userId });
  } catch (error) {
    console.log("backend", error);
    const errorMessage = error.message || "something went wrong";
    const errors = error.errors || [];
    console.error("Error creating user:", errorMessage);
    res.status(500).json({ error: errorMessage, errors: errors });
  }
});

app.put("/users/:id", async (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;

  try {
    const result = await conn.query("UPDATE users SET ? WHERE id = ?", [
      updateUser,
      id,
    ]);
    res.json({
      message: "update ok",
      data: result[0],
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Error updating user" });
  }
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

app.delete("/users/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const result = await conn.query("DELETE from users WHERE id = ?", id);
    res.json({
      message: "delete ok",
      data: result[0],
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Error deleting user" });
  }
});

// start the server
app.listen(port, async (req, res) => {
  await initMySQL();
  console.log(`http server run at ${port}`);
});
