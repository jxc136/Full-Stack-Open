const Blog = require("../models/blog");
const User = require("../models/user");
const initialBlogs = [
  {
    title: "S's blog",
    author: "Sam",
    url: "www.Samblog.com",
    likes: 111,
  },
  {
    title: "Josh's blog",
    author: "Josh",
    url: "www.Josh.com",
    likes: 222,
  },
];

const blogsinDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsinDb,
  usersInDb,
};
