const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => {
    return blog.likes;
  });

  const reducer = (sum, item) => {
    return sum + item;
  };
  return blogs.length === 0 ? 0 : likes.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  if (!blogs || blogs.length < 1) {
    throw new Error("no blogs found");
  }
  const likes = blogs.map((blog) => {
    return blog.likes;
  });
  console.log(likes);
  const mostLikes = Math.max(...likes);
  console.log(`most likes = ${mostLikes}`);
  const topBlog = blogs.find((blog) => blog.likes === mostLikes);
  console.log(topBlog);
  return topBlog;
};

module.exports = { dummy, totalLikes, favouriteBlog };
