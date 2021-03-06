class PostsFilter {

  filterPosts(posts) {  
    return posts.filter(curr => {     
      console.log(this.hasKeyword(curr), this.hasPicture(curr), this.hasReactions(curr), this.hasComments(curr) );
      return  this.hasKeyword(curr) &&
              this.hasPicture(curr) &&
              this.hasReactions(curr) && 
              this.hasComments(curr);
    });
  }


  getPostsByTimeRange(posts, time) {
    // Time ranges are in minutes
    return posts.filter(curr => {
      const created = Math.round(new Date(curr.created_time).getTime() / 60000);            
      return created > Math.round((new Date() / 60000) - time);
    });
  }

  hasKeyword(post) {
    if(!post)
      return false;
    else {
      if(!post.message)
        return true;// Skip if no message
      else
        return !!post.message.match(process.env.POST_REGEX);
    }
  }

  hasReactions(post) {
    if(!post)
      return false;
    else
      return post.totalCount >= process.env.POST_MIN_REACTIONS;
  }

  hasComments(post) {
    if(!post)
      return false;
    else
      return post.comment_count >= process.env.POST_MIN_COMMENTS;
  }

  hasPicture(message) {
    return !!(message.full_picture && process.env.POST_PICTURE);
  }
}

module.exports = PostsFilter;