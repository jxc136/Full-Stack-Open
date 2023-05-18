const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (!password) {
    return response.status(400).send({ error: "no password provided" });
  } else if (password.length < 3) {
    return response
      .status(400)
      .send({ error: "password must be at least 3 characters long " });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, name, passwordHash });

    const savedUser = await user.save();
    console.log(savedUser);

    response.status(201).json(savedUser);
  }
});

module.exports = usersRouter;
