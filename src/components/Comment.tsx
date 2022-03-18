import moment from "moment";
import React from "react";
import styled from "styled-components";

const Comment = () => {
  return (
    <CommentContainer>
      <CommentAvatar
        src="https://tr-static.eodev.com/files/d1e/96e1725f89132ee2a1113a8db2a7f107.jpg"
        alt="avatar"
      />
      <CommentBody>
        <CommentHeader>
          Summit Dey•{moment("2021-06-06").fromNow()}
        </CommentHeader>
        <p>Nice Video Dude!!!</p>
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
