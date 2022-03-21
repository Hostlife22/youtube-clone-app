import moment from "moment";
import React, { FC } from "react";
import styled from "styled-components";
import { Comments } from "../features/comments/commnentsSlice";

interface CommentProps {
  comment: Comments;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;

  return (
    <CommentContainer>
      <CommentAvatar src={authorProfileImageUrl} alt="avatar" />
      <CommentBody>
        <CommentHeader>
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </CommentHeader>
        <p>{textDisplay}</p>
      </CommentBody>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  padding: 8px;
  display: flex;
  font-size: 0.9rem;
  border-bottom: 2px solid #353946;
`;

const CommentAvatar = styled.img`
  border-radius: 50%;
  margin-right: 12px;
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const CommentBody = styled.div`
  > p:last-of-type {
    margin-bottom: 0;
  }
`;

const CommentHeader = styled.p`
  color: #fff;
  margin-bottom: 4px;
`;
