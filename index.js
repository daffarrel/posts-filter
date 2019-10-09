const express = require('express');
const app = express();
require('dotenv').config();

const Filter = require('./src/PostsFilter');
const filter = new Filter();


app.use(express.json());


filter.on('sendPost', (post) => {
  console.log('Send post');
});

/**
 * Gets top posts from the array of all posts in input
 */
app.get('/posts/top', (req, res) => {
    const postRegex = new RegExp(process.env.POSTS_REGEX);
    const time = process.env.POSTS_TIME_RANGE;

    // Filter by time
    let posts = filter.getPostsByTimeRange(req.body.posts, time);

    console.log(posts);

    if(posts !== false) {
      // Filter by keywords (regex)
      posts = filter.getPostsByRegex(posts, postRegex);
      res.send(posts);
    } else {
      res.send({
        'message': 'No data returned',
        'error': false
      });
    }
  });

  app.post('/posts/send', (req, res) => {
    const posts = req.body;
    const msg = filter.sendPost(posts);
    res.send(msg);
  });
  
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});