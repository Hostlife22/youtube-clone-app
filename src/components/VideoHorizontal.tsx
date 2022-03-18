import moment from "moment";
import numeral from "numeral";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";

const VideoHorizontal = () => {
  const seconds = moment.duration("100").asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  return (
    <VideoHorizontalContainer>
      <VideoHorizontalLeft xs={6} md={4}>
        <LazyLoadImage
          src="https://tr-static.eodev.com/files/d1e/96e1725f89132ee2a1113a8db2a7f107.jpg"
          effect="blur"
          wrapperClassName="videoHorizontal-wrapper"
        />
        <VideoHorizontalDuration>{_duration}</VideoHorizontalDuration>
      </VideoHorizontalLeft>
      <VideoHorizontalRight xs={6} md={8}>
        <p>Be a full stavk developer in 1 month</p>
        <div>
          <AiFillEye /> {numeral(1000000).format("0.a")} Views •
          {moment("2020-06-09").fromNow()}
        </div>
        <VideoHorizontalShannel>
          {/* <LazyLoadImage
            src="https://tr-static.eodev.com/files/d1e/96e1725f89132ee2a1113a8db2a7f107.jpg"
            effect="blur"
          /> */}
          <p>Backbanch Coder</p>
        </VideoHorizontalShannel>
      </VideoHorizontalRight>
    </VideoHorizontalContainer>
  );
};

export default VideoHorizontal;

const VideoHorizontalContainer = styled(Row)`
  margin: 4px;
  padding: 8px 0;
  align-items: center; //align-align-items-center
  border-bottom: 0.3px solid var(--border-color);
  cursor: pointer;

  @media (max-width: 520px) {
    font-size: 0.8rem;
  }
`;

const VideoHorizontalLeft = styled(Col)`
  position: relative;
  text-align: center;

  img {
    width: 100%;
  }

  .videoHorizontal-wrapper {
    width: 100%;
  }
`;

const VideoHorizontalRight = styled(Col)`
  padding: 0;

  > p {
    margin-bottom: 4px;
    font-size: 1rem;
    color: #fff;
    letter-spacing: 0.3px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  > div {
    font-size: 0.9rem;
  }

  @media (max-width: 520px) {
    > p {
      font-size: 1rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    > div {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
`;
const VideoHorizontalDuration = styled.span`
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  padding: 0.2rem;
  background: #080808ec;
  border-radius: 3px;
`;
const VideoHorizontalShannel = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;

  @media (max-width: 520px) {
    margin: 0.1rem 0;

    img {
      display: none;
    }

    p {
      font-size: 0.9rem;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 0.5rem;
    cursor: pointer;
  }

  p {
    font-size: 0.9rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
