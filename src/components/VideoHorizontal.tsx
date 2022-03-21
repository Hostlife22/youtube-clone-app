import moment from "moment";
import numeral from "numeral";
import React, { FC, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import request from "../api/api";
import { IRelatedId, IThumb } from "../app/types";

interface VideoHorizontalProp {
  video: IRelatedId;
  searchScreen?: boolean | undefined;
}

const VideoHorizontal: FC<VideoHorizontalProp> = ({ video, searchScreen }) => {
  const [views, setViews] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [channelIcon, setChannelIcon] = useState<IThumb | null | undefined>(
    null
  );
  const navigate = useNavigate();
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  useEffect(() => {
    const getVideoDetaild = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
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

  const isVideo = id.kind === "youtube#video";
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const handleClick = () => {
    isVideo
      ? navigate(`/watch/${id.videoId}`)
      : navigate(`/channel/${id.channelId}`);
  };

  return (
    <VideoHorizontalContainer onClick={handleClick}>
      <VideoHorizontalLeft xs={6} md={searchScreen ? 4 : 6} isVideo={isVideo}>
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          wrapperClassName="videoHorizontal-wrapper"
        />
        {isVideo && (
          <VideoHorizontalDuration>{_duration}</VideoHorizontalDuration>
        )}
      </VideoHorizontalLeft>
      <VideoHorizontalRight xs={6} md={searchScreen ? 8 : 6}>
        <p>{title}</p>
        {isVideo && (
          <div>
            <AiFillEye /> {numeral(views).format("0.a")} Views •
            {moment(publishedAt).fromNow()}
          </div>
        )}

        {isVideo && <p className="mt-1">{description}</p>}

        <VideoHorizontalShannel>
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect="blur" />}
          <p>{channelTitle}</p>
        </VideoHorizontalShannel>
      </VideoHorizontalRight>
    </VideoHorizontalContainer>
  );
};

export default VideoHorizontal;

const VideoHorizontalContainer = styled(Row)`
  margin: 4px;
  padding: 8px 0;
  align-items: center;
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

    ${(prop) =>
      !prop.isVideo &&
      `
	width: 50%;
	border-radius: 50%
	`}
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
    -webkit-line-clamp: 2;
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
  bottom: 0.6rem;
  right: 1.2rem;

  font-size: 0.9rem;
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
    margin-bottom: 0;
    font-size: 0.9rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
