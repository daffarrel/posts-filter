## Posts filter for Facebook Groups

The idea for this microservice is to filter out posts on social media and then post them on other social networks. This simple microservice will filter Facebook group posts by:

- time posted
- number of reactions / comments
- keywords
- min / max content length
- include / exclude users
- include / exclude additional content (image, video)

It will afterwards return selected posts.

### Configuration and setup

1. Clone repository
2. Inside directory run `npm install`
3. Copy and rename .env.example and fill it with details
4. Run using `npm run dev`

The easiest way to deploy this is to do it using integration services. Setup modules so that they export all parameters for post, `totalCount` for reactions and `comment_count` for comments.

### API docs

- GET: `/api/posts/top`

This endpoint takes post list as input in json form. It returns filtered post list.

#### Environment variables

- POST_REGEX: 

Regex for valid posts. Withouth slashes. If post has picture and no text, than this will be ignored.

- POST_TIME_RANGE

How old can valid posts be. In minutes. If one would like to include all posts from one day this would be 1440

- POST_MIN_REACTIONS, POST_MIN_COMMENTS:

Minimal number of reactions and comments for a post.

- SEND_URL, SEND_METHOD

Request url and method. This can be used to send data to other services.


