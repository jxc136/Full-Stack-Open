const bcrypt = require("bcrypt");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const User = require("../models/user");

describe("when there is a one user in DB", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("makers", 10);
    const user = new User({ username: "root", name: "root", passwordHash });

    await user.save();
  });

  test("a new user with a unique username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Drowsie",
      name: "Josh",
      password: "biscuits",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });

  test("user creation fails with proper status code and message if username already take", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { username: "root", name: "root", password: "root" };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("user creation fails with proper status code and message if username is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { username: "JC", name: "josh", password: "josh" };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      " Path `username` (`JC`) is shorter than the minimum allowed length"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("user creation fails with proper status code and message if password is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { username: "Josh", name: "josh", password: "jo" };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("user creation fails if no password given", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { username: "Josh", name: "josh" };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("no password provided");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("user creation fails if no username given", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { name: "Josh", password: "Hello" };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "User validation failed: username: Path `username` is required"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
