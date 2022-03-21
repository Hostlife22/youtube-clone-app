import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createComment,
  getCommentsOfVideoById,
  selectComments,
} from "../features/comments/commnentsSlice";
import { selectUser } from "../features/user/userSlice";
import Comment from "./Comment";

interface CommentsProps {
  videoId: string | undefined;
  totalComments: string | undefined;
}

const Comments: FC<CommentsProps> = ({ videoId, totalComments }) => {
  const [text, setText] = useState<string>("");
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const user = useAppSelector(selectUser);
  const { name, photoUrl }: { name: string; photoUrl: string } = user as any;

  useEffect(() => {
    if (videoId) {
      dispatch(getCommentsOfVideoById(videoId));
    }
  }, [dispatch, videoId]);

  const handleCommit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim().length === 0) return;

    const comment = {
      id: uniqid(),
      authorDisplayName: name,
      authorProfileImageUrl: photoUrl,
      publishedAt: new Date().toISOString(),
      textDisplay: text,
    };

    setText("");
    dispatch(createComment(comment));
  };

  return (
    <CommentsContainer>
      <p>{totalComments} Comments</p>
      <CommentsForm>
        <CommentsAvatar
          src="https://tr-static.eodev.com/files/d1e/96e1725f89132ee2a1113a8db2a7f107.jpg"
          alt="avatar"
        />
        <form onSubmit={handleCommit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="border-0">Comment</button>
        </form>
      </CommentsForm>
      <CommetsList>
        {comments?.map((com) => (
          <Comment comment={com} key={com.id} />
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
