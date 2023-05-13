const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogOjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogOjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when there are initial blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("adding a new blog post", () => {
  test("a valid new blog can be added", async () => {
    const newBlog = {
      title: "Daisy's Blog",
      author: "Daisy",
      url: "www.Daisy.com",
      likes: 333,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsinDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).toContain("Daisy's Blog");
  });

  test("Blog submission without likes is created with 0 likes in DB", async () => {
    const newBlog = {
      title: "Daisy's blog",
      author: "Daisy",
      url: "www.Daisy.com",
    };
    await api.post("/api/blogs").send(newBlog).expect(201);

    const blogsAtEnd = await helper.blogsinDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test("Blog without title is not added", async () => {
    const newBlog = {
      author: "Daisy",
      url: "www.Daisy.com",
      likes: 333,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
    const blogsAtEnd = await helper.blogsinDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("Blog without url is not added", async () => {
    const newBlog = {
      title: "Daisy's blog",
      author: "Daisy",
      likes: 333,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
    const blogsAtEnd = await helper.blogsinDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deleting a blog post", () => {
  test("a blog post can be deleted", async () => {
    const blogsAtStart = await helper.blogsinDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsinDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe("updating a blog post", () => {
  test("a valid blog post can be updated", async () => {
    const blogsAtStart = await helper.blogsinDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: "James's blog",
      author: "James",
      url: "www.James.com",
      likes: 222,
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const notesAtEnd = await helper.blogsinDb();
    const changedBlogPost = { ...updatedBlog, id: blogToUpdate.id };
    expect(notesAtEnd[0]).toStrictEqual(changedBlogPost);
  });

  test("fields not included in update request will remain unchanged ", async () => {
    const blogsAtStart = await helper.blogsinDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      author: "James",
      url: "www.James.com",
      likes: 222,
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsinDb();
    expect(blogsAtEnd[0].title).toBe(blogsAtStart[0].title);
    expect(blogsAtEnd[0].author).not.toBe(blogsAtStart[0].author);
  });

  test("Empty update request with valid id leaves object unchanged", async () => {
    const blogsAtStart = await helper.blogsinDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {};
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsinDb();
    expect(blogsAtEnd[0]).toStrictEqual(blogsAtStart[0]);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
