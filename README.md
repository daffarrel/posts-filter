## Posts filter for Facebook Groups

The idea for this microservice is to filter out posts on social media and then post them on other social networks. This simple microservice will filter Facebook group posts by:

- time posted
- reactions / comments
- keywords
- min / max content length
- include / exclude users
- include / exclude additional content (image, video)

It will afterwards send filtered data trought http request.

### Configuration and setup


1. Clone repository
2. Inside directory run `npm install`
3. Copy and rename .env.example and fill it with details
4. Run using `npm run serve`

#### Environment variables

- POST_REGEX: 

Regex for valid posts. Withouth slashes.

- POST_TIME_RANGE

How old can valid posts be. In minutes. If one would like to include all posts from one day this would be 1440

- SEND_URL, SEND_METHOD

Request url and method. This can be used to send data to other services.


### API docs

- GET: `/posts/top`

This endpoint takes post list as input in json form. It returns filtered post list.

- POST: `/posts/send`

Emits event. This can be additionally used to send data to other services.

