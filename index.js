const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

// Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// GET/users
app.get("/users", (req, res) => {
  const html = `
    <ol>
    ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ol>
    `;

  return res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server starte at PORT ${PORT}`);
});
