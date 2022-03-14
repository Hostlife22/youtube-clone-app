import React from "react";
import { AiFillEye } from "react-icons/ai";
import styled from "styled-components";

const Video = () => {
  return (
    <VideoContainer>
      <VideoTop>
        <img
          src="https://i.ytimg.com/vi/3yDnGk7DVCo/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDrVNMOvPiNUAHVEoQnhumx2FWedw"
          alt="video"
        />
        <span>05:43</span>
      </VideoTop>
      <VideoTitle> Create app in 5 minutes #made by Chintu</VideoTitle>
      <VideoDetails>
        <span>
          <AiFillEye /> 5m Views •
        </span>
        <span>5 days ago</span>
      </VideoDetails>
      <VideoChannel>
        <img
          src="https://yt3.ggpht.com/YHQQj0dkNbcRFE7PNLr4enu6pYLrVTb11uDA-3t8kr0W0bXn3yk43vrX3taVVL3Gtg1NFAT3LA=s88-c-k-c0x00ffffff-no-rj"
          alt=""
        />
        <p>Rainbow Hat Jr</p>
      </VideoChannel>
    </VideoContainer>
  );
};

export default Video;

const VideoContainer = styled.div`
  margin-bottom: 1rem;
  padding: 0.7rem;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
`;

const VideoTop = styled.div`
  margin-bottom: 0.5rem;
  position: relative;

  > img {
    width: 100%;
  }

  > span {
    position: absolute;
    bottom: 0.3rem;
    right: 0.3rem;
    padding: 0.2rem;
    background: #080808ec;
    border-radius: 3px;
  }
`;

const VideoTitle = styled.div`
  margin-bottom: 0.1rem;
  color: #fff;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const VideoDetails = styled.div`
  display: flex;
  align-items: center;
`;

const VideoChannel = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;

  > img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  > p {
    margin-bottom: 0;
  }
`;
