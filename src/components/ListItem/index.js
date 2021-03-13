import React from "react";
import moment from 'moment';
import getSiteHostname from '../../utils/getSiteHostname';
import getPostLink, { HN_ITEM, HN_USER } from '../../utils/getPostLink';

import {
  Item,
  Title,
  Host,
  ExternalLink,
  Description,
  CommentsLink,
} from "./styles";


const LINK_REL = "nooper noreferrer nofollow";

const ListItem = ({author_fullname, num_comments = [], score, url, title, subreddit_type, created_utc, id}) => {
    const site = getSiteHostname(url) || 'nolink.com';
    const link = getPostLink({ url, id });
    const commentUrl = `${HN_ITEM}${id}`;
    const userUrl = `${HN_USER}${author_fullname}`;
    const timeago = moment.unix(created_utc).fromNow();
  
    return (
    // <Item>
    //   <ExternalLink href={link} rel={LINK_REL} target='_blank'>
    //     <Title>
    //       {title} <Host>({site})</Host>
    //     </Title>
    //   </ExternalLink>
    //   <Description>
    //       {score} points by {' '}
    //     <CommentsLink href={userUrl} rel={LINK_REL} target="_blank">
    //       {author_fullname}
    //     </CommentsLink>
    //     {" | "}{timeago}{" | "}
    //     <CommentsLink href={commentUrl} rel={LINK_REL} target="_blank">
    //       {num_comments} comments
    //     </CommentsLink>
    //   </Description>
    // </Item>
    <Item>
       <ExternalLink href={link} rel={LINK_REL} target='_blank'>
         <Title>
           Titulo
         </Title>
       </ExternalLink>
       <Description>
           despcription
         <CommentsLink href={userUrl} rel={LINK_REL} target="_blank">
           autor
         </CommentsLink>
          hace 1 hora
         <CommentsLink href={commentUrl} rel={LINK_REL} target="_blank">
           123 comments
         </CommentsLink>
       </Description>
     </Item>
  );
};

export default ListItem;
