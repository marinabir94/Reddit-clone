import { actionTypes } from "./actions";

const getInitialState = () => ({
  subreddits: [],
  posts: [],
  page: 0,
  isFetching: false,
  error: "",
});

const post = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_SUBREDDITS_REQUEST:
    case actionTypes.FETCH_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.FETCH_SUBREDDITS_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    case actionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...payload.posts],
        page: state.page + 1,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default post;
