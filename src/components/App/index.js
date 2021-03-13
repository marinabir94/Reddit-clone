import { connect } from "react-redux";
import actions from "../../store/post/actions";
import App from "./App";

const mapStateToProps = (state) => ({ 
  posts: state.post.posts,
  page: state.post.page,
  subreddits: state.post.subreddits,
  isFetching: state.post.isFetching
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: ({ subreddits, page }) => dispatch(actions.fetchPosts({ subreddits, page })),
  fetchPostsFirstPage: () => dispatch(actions.fetchSubreddits())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
