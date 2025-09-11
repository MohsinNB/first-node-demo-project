const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
const { json } = require("stream/consumers");
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
// Routes
// GET/users
app.get("/users", (req, res) => {
  const html = `
    <ol>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ol>
    `;

  return res.send(html);
});
// REST api

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);

    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // Edit user with Id
    const { id, ...updates } = req.body;
    // give the error message if id is not truthy

    if (!id) {
      return res.json({ status: "error" }, { message: "user id required" });
    }

    // find the specific user using the id
    const findUser = users.find((user) => user.id === Number(id));
    if (findUser === -1) {
      return res
        .status("404")
        .json({ status: "error" }, { message: "user id does not exist" });
    }
    // replace the data with the updated data
    users[findUser] = { ...users[findUser], ...updates };
    console.log(typeof updates);

    return res.json({
      status: "success",
      message: "User updated successfully",
      user: users[findUser],
    });
  })
  .delete((req, res) => {
    // Delete user with Id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  const existingUser = users.find(
    (user) =>
      (user.first_name === body.first_name &&
        user.last_name === body.last_name) ||
      user.email === body.email
  );

  if (existingUser) {
    console.log(existingUser);
    return res.json({ status: "error" }, { message: "user already exist" });
  } else {
    users.push({ id: users.length + 1, ...body });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", id: users.length });
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server starte at PORT ${PORT}`);
});
