import redditApi from "../../services/redditApi";

const NS = "@hnClone/subreddit";

export const actionTypes = {
  FETCH_SUBREDDITS_REQUEST: `${NS}/FETCH_SUBREDDITS_REQUEST`,
  FETCH_SUBREDDITS_SUCCESS: `${NS}/FETCH_SUBREDDITS_SUCCESS`,
  FETCH_SUBREDDITS_FAILURE: `${NS}/FETCH_SUBREDDITS_FAILURE`,
  FETCH_POSTS_REQUEST: `${NS}/FETCH_POSTS_REQUEST`,
  FETCH_POSTS_SUCCESS: `${NS}/FETCH_POSTS_SUCCESS`,
  FETCH_POSTS_FAILURE: `${NS}/FETCH_POSTS_FAILURE`,
};

const action = (type, payload) => ({ type, payload });

const actions = {
  fetchSubreddits: (payload = {}) => {
    return (dispatch) => {
      dispatch(action(actionTypes.FETCH_SUBREDDITS_REQUEST), payload);

      return redditApi
        .getSubreddits()
        .then((subreddits) => {
          dispatch(
            action(actionTypes.FETCH_SUBREDDITS_SUCCESS, { subreddits })
          );
          console.log("Subreddits from the first then");
          console.log(subreddits);
          dispatch(actions.fetchPosts({ subreddits, page: 0 }));
          console.log("Subreddits extracted from Post>Actions:");
          console.log(subreddits);
          return subreddits;
        })
        .catch(err => {
          console.log("Error in fecthSubreddits from Post>Actions");
          dispatch(action(actionTypes.FETCH_SUBREDDITS_FAILURE, err));
        });
    };
  },

  fetchPosts: (payload = {}) => {
    return (dispatch) => {
      dispatch(action(actionTypes.FETCH_POSTS_REQUEST, payload));
      console.log("First Then");
      const { subreddits, page } = payload;
      console.log("Second Then");
      return redditApi
        //.getPostsByPage(subreddits, page)
        .getPosts(subreddits)
        .then((posts) => {
          console.log("Third Then");
          dispatch(action(actionTypes.FETCH_POSTS_SUCCESS, { posts }))
        
        })
  
        .catch(err => {
          console.log("Error");
          dispatch(action(actionTypes.FETCH_POSTS_FAILURE, err))
        });
    };
  },
};

export default actions;
