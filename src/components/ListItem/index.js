import React from 'react';

import { Item, Title, Host, ExternalLink, Description, CommentsLink } from './styles';

const LINK_REL = 'nooper noreferrer nofollow'

const ListItem = () => {
    return (
        <Item>
            <ExternalLink>
                <Title>
                    The Developer Community <Host>(gitconnected.com)</Host>
                </Title>
            </ExternalLink>
            <Description>
                <CommentsLink href='#' rel={LINK_REL} target='_blank'>
                marinaballester 
                </CommentsLink>
                {' | '}1 hour ago {' | '}
                <CommentsLink href='#' rel={LINK_REL} target='_blank'>
                42 comments
                </CommentsLink>
            </Description>
        </Item>
    )
}

export default ListItem;