import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import {
  getPopularVideos,
  getVideosCategory,
} from "../features/videos/videosSlice";

const keywords: string[] = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art",
  "Guitar",
  "Bengali Songs",
  "Codding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState<string>("All");
  const dispatch = useAppDispatch();

  const handleClick = (value: string): void => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosCategory(value));
    }
  };

  return (
    <CategoriesBarContainer>
      {keywords.map((value, i) => (
        <CategoriesElement
          onClick={() => handleClick(value)}
          active={activeElement === value}
          key={i}
        >
          {value}
        </CategoriesElement>
      ))}
    </CategoriesBarContainer>
  );
};

export default CategoriesBar;

const CategoriesBarContainer = styled.div`
  padding: 0.5rem 0;
  font-size: 0.8rem;
  display: flex;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    width: 0px;
  }
  scrollbar-width: none;
`;

const CategoriesElement = styled.span<{ active: boolean }>`
  margin-right: 1rem;
  padding: 0.5rem;
  white-space: nowrap;
  border: 1.5px solid var(--text-color);
  border-radius: 999px;
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:hover {
    background-color: #374a59;
  }

  ${({ active }) =>
    active &&
    `
	color: #fff;
	background-color: #606060;
	border-color: #4c4c4c;
  `}
`;
