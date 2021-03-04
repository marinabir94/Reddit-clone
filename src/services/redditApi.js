import ApiService from './api';

const BASE_URL = 'https://www.reddit.com/';
//const client = new ApiService({ baseURL: BASE_URL});

const redditApi = {};

const PAGE_LIMIT = 20;
const getPageSlice = (limit, page = 0) => ({ begin: page * limit, end: (page + 1) * limit });
const getPageValues = ({ begin, end, items }) => items.slice(begin, end);


//redditApi.getTopThingsID = () => client.get(`/popular/top.json?limit=25&where=Spain`)
redditApi.getSubredditPosts = async (subreddit) => {
    const response = await fetch(`${BASE_URL}${subreddit}.json`);
    const json = await response.json();

    return json.data.children.map((post) => post.data);
};

redditApi.getSubredditPostsByPage = (subreddits, page) => {
    const { begin, end } = getPageSlice(PAGE_LIMIT, page);
    const activeSubreddits = getPageValues({ begin, end, items: subreddits });
    const subredditPromises = activeSubreddits.map(subreddit => redditApi.getSubredditPosts(subreddit));
    return Promise.all(subredditPromises);
};
  
redditApi.getSubreddits = async () => {
    const response = await fetch(`${BASE_URL}/subreddits.json`);
    const json = await response.json();
  
    return json.data.children.map((subreddit) => subreddit.data);
};
  
redditApi.getPostComments = async (permalink) => {
    const response = await fetch(`${BASE_URL}${permalink}.json`);
    const json = await response.json();
  
    return json[1].data.children.map((subreddit) => subreddit.data);
};

export default redditApi;
  