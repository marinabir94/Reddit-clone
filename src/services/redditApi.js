import ApiService from "./api";

const BASE_URL = "https://www.reddit.com/r";
//const client = new ApiService({ baseURL: BASE_URL});

const redditApi = {};

const PAGE_LIMIT = 20;
const getPageSlice = (limit, page = 0) => ({
  begin: page * limit,
  end: (page + 1) * limit,
});
const getPageValues = ({ begin, end, items }) => items.slice(begin, end);

//redditApi.getTopThingsID = () => client.get(`/popular/top.json?limit=25&where=Spain`)
redditApi.getPosts = async (subreddit) => {
  console.log('Inside getPosts 1!!!!!!!!!!!!!!!!!')
  const endpoint = BASE_URL + subreddit[0].data + '.json';
  console.log(endpoint)
  const response = await fetch(endpoint);
  console.log('Inside getPosts 2!!!!!!!!!!!!!!!!!')
  console.log(endpoint)
  const json = await response.json();
  console.log('Inside getPosts 3')
  return json.data.children.map((post) => post.data);
};

redditApi.getPostsByPage = (subreddit, page) => {
  console.log('Inside getPostsByPage 1')
  const { begin, end } = getPageSlice(PAGE_LIMIT, page);
  console.log('Inside getPostsByPage 2')
  const activeSubreddits = getPageValues({ begin, end, items: subreddit });
  console.log('Inside getPostsByPage 3')
  const postPromises = activeSubreddits.map((subreddit) =>
    redditApi.getPosts(subreddit)
  );
  console.log('Inside getPostsByPage 4')
  return Promise.all(postPromises);
};

redditApi.getSubreddits = async () => {
  const response = await fetch(`${BASE_URL}/subreddits.json`);
  const json = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

redditApi.getPostComments = async (permalink) => {
  //const endpoint = 
  const response = await fetch(`${BASE_URL}${permalink}.json`);
  const json = await response.json();

  return json[1].data.children.map((subreddit) => subreddit.data);
};

export default redditApi;
