import React from "react";
import styled from "styled-components";
import Comment from "./Comment";

const Comments = () => {
  const handleCommit = () => {};

  return (
    <CommentsContainer>
      <p>1234 Comments</p>
      <CommentsForm>
        <CommentsAvatar
          src="https://tr-static.eodev.com/files/d1e/96e1725f89132ee2a1113a8db2a7f107.jpg"
          alt="avatar"
        />
        <form onSubmit={handleCommit}>
          <input type="text" placeholder="Write a comment..." />
          <button className="border-0">Comment</button>
        </form>
      </CommentsForm>
      <CommetsList>
        {[...Array(15)].map(() => (
          <Comment />
        ))}
      </CommetsList>
    </CommentsContainer>
  );
};

export default Comments;

const CommentsContainer = styled.div``;
const CommentsForm = styled.div`
  display: flex;
  width: 100%;
  margin: 8px 0;

  > form {
    display: flex;
    flex-grow: 1;
  }

  > form > input {
    flex-grow: 1;
    background: transparent;
    border: none;
    border-bottom: 2px solid #353946;
    color: #fff;

    &:focus {
      outline: none;
    }
  }

  > form > button {
    padding: 8px;
    background-color: #353946;
    color: #fff;
    letter-spacing: 0.5px;
    &:focus {
      border: none;
      outline: none;
    }
  }
`;

const CommentsAvatar = styled.img`
  border-radius: 50%;
  margin-right: 12px;
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const CommetsList = styled.div``;
