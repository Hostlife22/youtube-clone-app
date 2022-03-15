import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAccessToken, userLogin } from "../features/user/userSlice";

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(userLogin());
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <Login>
      <LoginContainer>
        <img
          src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="logo"
        />
        <button onClick={handleLogin}>Login With google</button>
        <p>This Project is made using YOUTUBE DATA API</p>
      </LoginContainer>
    </Login>
  );
};

export default LoginScreen;

const Login = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;

  img {
    width: 130px;
    height: 130px;
    object-fit: contain;
  }

  button {
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    margin-bottom: 1rem;
    &:focus {
      outline: none;
    }
  }
`;
const LoginContainer = styled.div`
  background-color: var(--black-secondary);
  padding: 2rem;
  margin: 0 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
