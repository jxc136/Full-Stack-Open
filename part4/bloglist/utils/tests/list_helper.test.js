const listHelper = require("../list_helper");

test("dummy returns 1", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("totalLikes", () => {
  test("list with one blog", () => {
    const blogs = [
      {
        _id: 1,
        title: "Sam's blog",
        author: "Sam's",
        url: "www.Samblog.com",
        likes: 111,
      },
    ];

    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(111);
  });
  test("list with more than one blog", () => {
    const blogs = [
      {
        _id: 1,
        title: "Sam's blog",
        author: "Sam",
        url: "www.Samblog.com",
        likes: 111,
      },
      {
        _id: 2,
        title: "Josh's blog",
        author: "Josh",
        url: "www.Josh.com",
        likes: 222,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(333);
  });

  test("no blogs should return 0", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });
});

describe("favouriteBlog", () => {
  test("a single blog returns the blog", () => {
    const blogs = [
      {
        _id: 1,
        title: "Sam's blog",
        author: "Sam",
        url: "www.Samblog.com",
        likes: 111,
      },
    ];
    const result = listHelper.favouriteBlog(blogs);
    expect(result).toBe(blogs[0]);
  });

  test("highest liked blog returned with 2 blogs", () => {
    const blogs = [
      {
        _id: 1,
        title: "Sam's blog",
        author: "Sam",
        url: "www.Samblog.com",
        likes: 111,
      },
      {
        _id: 2,
        title: "Josh's blog",
        author: "Josh",
        url: "www.Josh.com",
        likes: 222,
      },
    ];
    const result = listHelper.favouriteBlog(blogs);
    expect(result).toEqual({
      _id: 2,
      title: "Josh's blog",
      author: "Josh",
      url: "www.Josh.com",
      likes: 222,
    });
  });

  test("empty blog raises error ", () => {
    const blogs = [];
    expect(() => {
      listHelper.favouriteBlog(blogs);
    }).toThrow("no blogs found");
  });
});
