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
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // Delete user with Id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;

  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});
app.listen(PORT, () => {
  console.log(`Server starte at PORT ${PORT}`);
});
