const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

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

app.listen(PORT, () => {
  console.log(`Server starte at PORT ${PORT}`);
});
