import React from "react";
import ListItem from "../ListItem/index";

import { ListWrapper } from "./styles";

const List = ({ posts }) => {
  //console.log(`Posts length: ${posts.length}`);
  return (
    <ListWrapper>
        {/* {posts.map(post => (
          
          <ListItem key={post.id} {...post} />
        ))} */}
    </ListWrapper>
  );
};

export default List;
