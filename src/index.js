import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import App from "./components/App/index";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./styles/globals";
import redditApi from "./services/redditApi";
import loadInitialState from './store/middleware/localStorageMiddleware/loadInitialState';

redditApi.getSubreddits().then((subreddits) => {
  console.log('Extracted from API: -->');
  console.log(subreddits);
});

const renderApp = () => {
  const initialState = loadInitialState();
  const store = configureStore(initialState);

  console.log('Initial state ->');
  console.log(store.getState());

  //store.dispatch({ type: "@hnClone/@@INIT" });

  ReactDOM.render(
    <Provider store={store}>
      <div>
        <GlobalStyles />
        <App />
      </div>
    </Provider>,
    document.getElementById("root")
  );
};

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
