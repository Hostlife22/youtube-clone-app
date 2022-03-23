import moment from "moment";
import numeral from "numeral";
import React, { FC, useEffect } from "react";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IVideoById } from "../app/types";
import {
  checkSubscriptionStatus,
  getChannelDetails,
  selectChannel,
  selectSubscribiption,
} from "../features/channel/channelSlice";
import HelmetCustom from "./HelmetCustom";

interface VideoMetaDataProps {
  video: IVideoById | null;
  videoId: string | undefined;
}

const VideoMetaData: FC<VideoMetaDataProps> = ({ video, videoId }) => {
  const channelId = video?.snippet.channelId;
  const disptach = useAppDispatch();
  const { snippet: channelSnippet, statistics: channelStatistics } =
    useAppSelector(selectChannel);
  const subscriptionStatus = useAppSelector(selectSubscribiption);

  useEffect(() => {
    if (channelId) {
      disptach(getChannelDetails(channelId));
      disptach(checkSubscriptionStatus(channelId));
    }
  }, [disptach, channelId]);

  return (
    <VideoMetaDataContainer>
      <HelmetCustom
        title={video?.snippet?.title}
        description={video?.snippet?.description}
      />
      <VideoMetaDataTop>
        <h5>{video?.snippet.title}</h5>
        <div>
          <span>
            {numeral(video?.statistics.viewCount).format("0.a")} Views •
            {moment(video?.snippet.publishedAt).fromNow()}
          </span>

          <div>
            <span>
              <MdThumbUp size={26} />{" "}
              {numeral(video?.statistics.likeCount).format("0.a")}
            </span>
            <span>
              <MdThumbDown size={26} />{" "}
              {numeral(video?.statistics.likeCount).format("0.a")}
            </span>
          </div>
        </div>
      </VideoMetaDataTop>
      <VideoMetaDataChannel>
        <div>
          <img src={channelSnippet?.thumbnails?.default?.url} alt="avatar" />
          <div>
            <span>{video?.snippet.channelTitle}</span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribers
            </span>
          </div>
        </div>
        <button
          className={`btn border-0 p-2 m-2 `}
          style={{ backgroundColor: `${subscriptionStatus ? "gray" : "red"}` }}
        >
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </VideoMetaDataChannel>
      <VideoMetaDataDescription>
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {video?.snippet.description}
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
