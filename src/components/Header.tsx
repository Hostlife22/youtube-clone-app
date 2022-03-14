import React, { FC } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { MdApps, MdNotifications } from "react-icons/md";
import styled from "styled-components";

type HeaderProps = {
  handleToggleSidebar: () => void;
};

const Header: FC<HeaderProps> = ({ handleToggleSidebar }) => {
  return (
    <HeaderContainer className="border border-dark">
      <HeaderMenu size={26} onClick={handleToggleSidebar} />
      <HeaderLogo
        src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt="logo"
      />

      <form>
        <input type="text" placeholder="Search" />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <HeaderIcons>
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src="https://tr-static.eodev.com/files/d1e/96e1725f89132ee2a1113a8db2a7f107.jpg"
          alt="avatar"
        />
      </HeaderIcons>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background-color: var(--black-primary);
  height: 10vh;
  width: 100%;

  @media (max-width: 520px) {
    padding: 1rem;

    form {
      flex: 1;
    }
  }

  > form {
    flex: 0.6;
    display: flex;
    padding: 0.1rem;
    margin: 0 1rem;
    border-radius: 3px;
    border: 1.2px solid;
    background-color: var(--black-secondary);

    > input {
      width: 100%;
      border: none;
      font-weight: 500;
      background: transparent;
      padding: 0.3rem;
      color: var(--text-color);

      &:focus {
        outline: none;
      }
    }
    > button {
      padding: 0 1.25rem;
      color: var(--text-color);
      background: transparent;
      border: none;
      &:focus {
        border: none;
      }
    }
  }
`;

const HeaderMenu = styled(FaBars)`
  display: none;

  @media (max-width: 520px) {
    display: block;
  }
`;

const HeaderLogo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  display: block;

  @media (max-width: 520px) {
    display: none;
  }
`;

const HeaderIcons = styled.div`
  flex: 0.15;
  display: flex;
  justify-content: space-around;
  align-items: center;

  > img {
    border-radius: 50%;
    width: 40px;
    object-fit: contain;
    margin-left: 5px;
  }

  > * {
    cursor: pointer;
  }

  @media (max-width: 520px) {
    > *:not(img) {
      display: none;
    }
  }
`;
