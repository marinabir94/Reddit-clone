//https://www.youtube.com/watch?v=oGB_VPrld0U&list=PLTTC1K14KAxHj6AftnRUD28SQaoVauvl3&index=1
//https://gitconnected.com/courses/learn-react-redux-tutorial-build-a-hacker-news-clone
//https://github.com/gitconnected/hacker-news-reader/tree/master/src
import React, { Component } from "react";
import logo from "./logo.svg";

import { ThemeProvider } from "styled-components";
import { colorsDark } from "../../styles/palette";
import { Wrapper, Title } from "./styles";
import List from "../List/index";

class App extends Component {
  componentDidMount() {
    this.props.fetchPostsFirstPage();
  }

  render() {
    const posts = this.props;
    console.log('Props from App are:')
    console.log(this.props)
    return (
      <ThemeProvider theme={colorsDark}>
        <div>
          <Wrapper>
            <Title>Reddit Minimal Clone</Title>
            <List posts={posts}/>
          </Wrapper>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
