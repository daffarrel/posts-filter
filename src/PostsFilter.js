const EventEmitter = require('events');
const axios = require('axios').default;

class PostsFilter extends EventEmitter {
  constructor() {
    super();
  }

  filterPosts(posts) {  
    return posts.filter(curr => {      
      return curr.message ? curr.message.match(process.env.POST_REGEX) : true && this.hasPicture(curr);
    });
  }

  getPostsByTimeRange(posts, time) {
    // Time ranges are in minutes
    return posts.filter(curr => {
      const created = Math.round(new Date(curr.created_time).getTime() / 60000);            
      return created > Math.round((new Date() / 60000) - time);
    });
  }
  
  getResponse(message, error) {
    return {
      message: message ? message : 'Default',
      error: error ? error : false
    };
  }

  hasPicture(message) {
    return message.full_picture && process.env.POST_PICTURE;
  }

  sendPost(post) {
    let msg = this.getResponse('Ok', false);
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