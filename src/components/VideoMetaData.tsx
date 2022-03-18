import moment from "moment";
import numeral from "numeral";
import React from "react";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import styled from "styled-components";

const VideoMetaData = () => {
  return (
    <VideoMetaDataContainer>
      <VideoMetaDataTop>
        <h5>Video Title</h5>
        <div>
          <span>
            {numeral(1000).format("0.a")} Views •{moment("2020-06-6").fromNow()}
          </span>

          <div>
            <span>
              <MdThumbUp size={26} /> {numeral(1000).format("0.a")}
            </span>
            <span>
              <MdThumbDown size={26} /> {numeral(1000).format("0.a")}
            </span>
          </div>
        </div>
      </VideoMetaDataTop>
      <VideoMetaDataChannel>
        <div>
          <img
            src="https://tr-static.eodev.com/files/d1e/96e1725f89132ee2a1113a8db2a7f107.jpg"
            alt="avatar"
          />
          <div>
            <span>Backbanch Coder</span>
            <span>{numeral(1000).format("0.a")} Subscribers</span>
          </div>
        </div>
        <button className="btn border-0 p-2 m-2">Subscribe</button>
      </VideoMetaDataChannel>
      <VideoMetaDataDescription>
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
          quasi deserunt molestias, fuga minus quibusdam. Accusamus
          reprehenderit distinctio debitis et. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Dignissimos quasi deserunt molestias,
          fuga minus quibusdam. Accusamus reprehenderit distinctio debitis et.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
          quasi deserunt molestias, fuga minus quibusdam. Accusamus
          reprehenderit distinctio debitis et. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Dignissimos quasi deserunt molestias,
          fuga minus quibusdam. Accusamus reprehenderit distinctio debitis et.
        </ShowMoreText>
      </VideoMetaDataDescription>
    </VideoMetaDataContainer>
  );
};

export default VideoMetaData;

const VideoMetaDataContainer = styled.div`
  padding: 0.5rem 0;
`;

const VideoMetaDataTop = styled.div`
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;

    > div {
      span {
        margin-right: 12px;
        cursor: pointer;
      }
    }
  }
`;

const VideoMetaDataChannel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
  padding: 12px;
  border-top: 0.2px solid var(--border-color);
  border-bottom: 0.2px solid var(--border-color);

  > div:first-of-type {
    display: flex;

    img {
      border-radius: 50%;
      margin-right: 12px;
      width: 50px;
      height: 50px;
    }

    div {
      display: flex;
      flex-direction: column;
    }
  }

  > button {
    background-color: red;
    color: #fff;
    border-radius: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    &:hover {
      color: #fff;
    }
    &:focus {
      border: none;
      outline: none;
    }
  }
`;
const VideoMetaDataDescription = styled.div`
  font-size: 0.9rem;
  white-space: pre-line;
  border-bottom: 0.2px solid var(--border-color);
  .showMoreText {
    text-decoration: none;
    display: block;
    margin: 1rem 0;
	color: #fff;
	font-weight: 500;
	
  }
`;
