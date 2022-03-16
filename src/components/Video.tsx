import moment from "moment";
import numeral from "numeral";
import React, { FC, useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import styled from "styled-components";
import request from "../api/api";
import { IThumb, IVideo } from "../app/types";

interface IVideoCategory {
  kind: string;
  videoId: string;
}

interface VideoProps {
  video: IVideo;
}

const Video: FC<VideoProps> = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [channelIcon, setChannelIcon] = useState<IThumb | null | undefined>(
    null
  );

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const _id = id as any as IVideoCategory;
  const _videoId = _id?.videoId || id;

  useEffect(() => {
    const getVideoDetaild = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetaild();
  }, [_videoId]);

  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    getChannelIcon();
  }, [channelId]);

  return (
    <VideoContainer>
      <VideoTop>
        <img src={medium.url} alt="video" />
        <span>{_duration}</span>
      </VideoTop>
      <VideoTitle>{title}</VideoTitle>
      <VideoDetails>
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views •
        </span>
        <span> {moment(publishedAt).fromNow()}</span>
      </VideoDetails>
      <VideoChannel>
        <img src={channelIcon?.url} alt="" />
        <p>{channelTitle}</p>
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
