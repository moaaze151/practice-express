//Don't forgot to install backage nodemon for automatically updating
const express = require("express");
const app = express();

//to make express read data from PostmanCanary app (middleware) before browser read it
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = 3000;

const users = [
  { name: "menna", title: "doctor" },
  { name: "mo3az", title: "web developer" },
];

//when the user make request on "/" we send him this msg
app.get("/", (req, res) => {
  res.send("Hello Express");
});
app.get("/admin", (req, res) => {
  res.send("<h1>Hi Admin</h1>");
});

// 1:main get .....................................
app.get("/users", (req, res) => {
  res.status(200).json({ info: users });
});
// 2:main post .....................................
app.post("/users", (req, res) => {
  console.log(req.body);
  const u = {
    name: req.body.name,
    title: req.body.title,
  };
  users.push(u);
  res.status(200).json({ added: u });
});
// 3:only user get  .....................................
app.get("/users/:name", (req, res) => {
  const obj = users.find((e) => e.name === req.params.name);
  if (obj === undefined) {
    res.send(`<h1>Not Found </h1>`);
    res.status(404).json({ msg: "user not found" });
  } else {
    res.send(`<h1>my name is ${obj.name} <br/> I'm a ${obj.title} </h1>`);
    res.status(200).json({ users: obj });
  }
});
// 4: delete .....................................
app.delete("/users/:name", (req, res) => {
  const delUser = users.find((e) => e.name === req.params.name);
  if (delUser === undefined) {
    res.status(404).json({ msg: "user not found" });
  } else {
    const index = users.indexOf(delUser);
    users.splice(index, 1);
    res.status(200).json({ msg: "user deleted" });
  }
});
// 4: modify.....................................
app.patch("/users/:name", (req, res) => {
  const modUser = users.find((e) => e.name === req.params.name);
  if (modUser === undefined) {
    res.status(404).json({ msg: "user not found" });
  } else {
    modUser.name = req.body.name ? req.body.name : modUser.name;
    modUser.title = req.body.title ? req.body.title : modUser.title;
    res.status(200).json({ user: modUser });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
