const EventEmitter = require('events');
const axios = require('axios').default;

class PostsFilter extends EventEmitter {
  constructor() {
    super();
  }

  getPostsByRegex(posts, postRegex) {
    return posts.filter(curr => {
      return curr.content.match(postRegex);
    });
  }

  getPostsByTimeRange(posts, time) {
    // Time ranges are in minutes
    const rangeFrom = time;
    return posts.filter(curr => {
      console.log(curr.time, Math.round((new Date() / 60000) - time), (curr.time < Math.round((new Date() / 60000) - time)));
      
      return curr.time < Math.round((new Date() / 60000) - time);
    });
  }
  
  getResponse(message, error) {
    return {
      message: message ? message : 'Default',
      error: error ? error : false
    };
  }

  sendPost(post) {
    let msg = this.getResponse('Ok', false);
    console.log(post);
    axios({
      method: process.env.SEND_METHOD,
      url: process.env.SEND_URL,
      data: post
    }).catch((error) => {
      msg = this.getResponse(error);
    });
    return msg;
  }
}

module.exports = PostsFilter;