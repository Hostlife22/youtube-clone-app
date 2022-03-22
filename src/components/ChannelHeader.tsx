import numeral from "numeral";
import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import { selectChannel } from "../features/channel/channelSlice";

const ChannelHeader = () => {
  const { statistics, snippet } = useAppSelector(selectChannel);

  return (
    <ChannelContainer>
      <ChannelContent>
        <img src={snippet?.thumbnails?.default?.url} alt="" />
        <ChannelDetails>
          <h3>{snippet?.title}</h3>
          <span>
            {numeral(statistics?.subscriberCount).format("0.a")} subscribers
          </span>
        </ChannelDetails>
      </ChannelContent>

      <button>Subscribe</button>
    </ChannelContainer>
  );
};

export default ChannelHeader;

const ChannelContainer = styled.div`
  padding: 8px 20px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);

  @media (max-width: 1224px) {
    padding: 1rem 0;
  }

  > button {
    text-transform: uppercase;
    background-color: red;
    color: #fff;
    font-size: 1rem;
    padding: 0.4rem;
    border: none;
  }
`;
const ChannelContent = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1224px) {
    > img {
      width: 50px;
      height: 50px;
    }

    > h3 {
      font-size: 1rem;
      margin: 0;
    }
  }

  > img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
`;
const ChannelDetails = styled.div`
  margin-left: 12px;
`;
