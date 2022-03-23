import moment from "moment";
import numeral from "numeral";
import React, { FC, useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import request from "../api/api";
import { IThumb } from "../app/types";
import { VideoItem } from "./VideoHorizontal";

interface IVideoCategory {
  kind: string;
  videoId: string;
}

interface VideoProps {
  video: VideoItem;
  channelScreen?: boolean;
}

const Video: FC<VideoProps> = ({ video, channelScreen }) => {
  const { id, channelId, channelTitle, title, publishedAt, url } = video;

  const [views, setViews] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [channelIcon, setChannelIcon] = useState<IThumb | null | undefined>(
    null
  );
  const navigate = useNavigate();

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  useEffect(() => {
    const getVideoDetaild = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetaild();
  }, [id]);

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

  const handleVideoClick = () => {
    navigate(`/watch/${id}`);
  };

  return (
    <VideoContainer onClick={handleVideoClick}>
      <VideoTop>
        <LazyLoadImage src={url} effect="blur" />
        <VideoDuration>{_duration}</VideoDuration>
      </VideoTop>
      <VideoTitle>{title}</VideoTitle>
      <VideoDetails>
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views •
        </span>
        <span> {moment(publishedAt).fromNow()}</span>
      </VideoDetails>
      {!channelScreen && (
        <VideoChannel>
          <LazyLoadImage src={channelIcon?.url} effect="blur" />
          <p>{channelTitle}</p>
        </VideoChannel>
      )}
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

  .lazy-load-image-background {
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

const VideoDuration = styled.span`
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  padding: 0.2rem;
  background: #080808ec;
  border-radius: 3px;
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

  img {
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
