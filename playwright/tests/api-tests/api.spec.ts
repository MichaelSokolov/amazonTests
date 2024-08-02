const { test, expect } = require("@playwright/test");

test('Check posts for user with id "1"', async ({ request }) => {
  // Fetch all posts
  const postsResponse = await request.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  expect(postsResponse.ok()).toBeTruthy();
  const posts = await postsResponse.json();

  // Fetch posts for user with id "1"
  const userPostsResponse = await request.get(
    "https://jsonplaceholder.typicode.com/users/1/posts"
  );
  expect(userPostsResponse.ok()).toBeTruthy();
  const userPosts = await userPostsResponse.json();

  // Filter all posts to get only those for user with id "1"
  const postsForUser1 = posts.filter((post) => post.userId === 1);

  // Compare the lists
  expect(userPosts).toEqual(postsForUser1);
});
