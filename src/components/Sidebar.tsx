import React, { FC } from "react";
import {
  MdExitToApp,
  MdHistory,
  MdHome,
  MdLibraryBooks,
  MdSentimentDissatisfied,
  MdSubscriptions,
  MdThumbUp,
} from "react-icons/md";
import styled from "styled-components";

interface SidebarProps {
  sidebar: boolean;
  handleToggleSidebar?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ sidebar, handleToggleSidebar }) => {
  return (
    <SidebarContainer sidebar={sidebar} onClick={handleToggleSidebar}>
      <li>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      <li>
        <MdSubscriptions size={23} />
        <span>Subscriptions</span>
      </li>
      <li>
        <MdThumbUp size={23} />
        <span>Liked Video</span>
      </li>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>I don't know</span>
      </li>

      <hr />

      <li>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>

      <hr />
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.nav<SidebarProps>`
  background: var(--black-secondary);
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 90vh;
  padding-top: 2rem;
  transition: transform 0.2s ease-in;

  @media (max-width: 1224px) {
    width: 90px;

    li {
      justify-content: center;

      span {
        display: none;
      }
    }
  }

  @media (max-width: 520px) {
    transform: ${({ sidebar }) =>
      sidebar ? "transform: translateX(0)" : "translateX(-100%)"};
    position: fixed;
    z-index: 999;
  }

  > li {
    display: flex;
    align-items: center;

    padding: 0.6rem 1.5rem;
    margin: 0.2rem 0;
    cursor: pointer;
    list-style-type: none;
    transition: all 0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);

    > span {
      margin-left: 1rem;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.4px;
    }

    &:hover {
      background-color: var(--border-color);
    }
  }

  > hr {
    background-color: var(--border-color);
  }
`;