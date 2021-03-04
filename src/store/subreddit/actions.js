import redditApi from '../../services/redditApi';

const NS = '@hnClone/subreddit';

export const actionTypes = {
    FETCH_SUBREDDITS_REQUEST: `${NS}/FETCH_SUBREDDITS_REQUEST`,
    FETCH_SUBREDDITS_SUCCESS: `${NS}/FETCH_SUBREDDITS_SUCCESS`,
    FETCH_SUBREDDITS_FAILURE: `${NS}/FETCH_SUBREDDITS_FAILURE`,
    FETCH_SUBREDDITS_POSTS_REQUEST: `${NS}/FETCH_SUBREDDITS_POSTS_REQUEST`,
    FETCH_SUBREDDITS_POSTS_SUCCESS: `${NS}/FETCH_SUBREDDITS_POSTS_SUCCESS`,
    FETCH_SUBREDDITS_POSTS_FAILURE: `${NS}/FETCH_SUBREDDITS_POSTS_FAILURE`
};

const action = (type, payload) => ({ type, payload });

const actions = {

    fetchSubreddits: (payload = {}) => {
        return dispatch => {
            dispatch(action(actionTypes.FETCH_SUBREDDITS_REQUEST), payload);

            return redditApi
                .getSubreddits()
                .then(subreddits => {
                    dispatch(action(actionTypes.FETCH_SUBREDDITS_SUCCESS, {subreddits}));
                    dispatch(actionTypes.fetchSubredditPosts({ subreddits, page: 0 }));
                    return subreddits;
                })
                .catch(err => dispatch(action(actionTypes.FETCH_SUBREDDITS_FAILURE)));
        }
    },

    fetchSubredditPosts: (payload = {}) => {
        return dispatch => {
            dispatch(action(actionTypes.FETCH_SUBREDDITS_POSTS_REQUEST, payload));
            const { subreddits, page } = payload;

            return redditApi
                .getSubredditPostsByPage(subreddits, page)
                .then(subredditPosts => {
                    dispatch(action(action(actionTypes.FETCH_SUBREDDITS_POSTS_SUCCESS, { subredditPosts })));
                })
                .catch(err => dispatch(action(actionTypes.FETCH_SUBREDDITS_POSTS_FAILURE)));
        }
    }
};

export default actions;