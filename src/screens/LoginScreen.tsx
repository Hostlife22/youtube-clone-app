import React from "react";
import styled from "styled-components";

const LoginScreen = () => {
  return (
    <Login>
      <LoginContainer>
        <img
          src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="logo"
        />
        <button>Login With google</button>
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
