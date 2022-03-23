import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Comments from "../components/Comments";
import VideoHorizontal from "../components/VideoHorizontal";
import VideoMetaData from "../components/VideoMetaData";
import {
  getRelatedVideos,
  selectRelatedVideo,
} from "../features/relatedVideos/relatedVideoSlice";
import { getVideoById, selectVideo } from "../features/video/videoSlice";

const WatchScreen = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const dispatch = useAppDispatch();
  const { video, loading } = useAppSelector(selectVideo);
  const { videos, loading: relatedVideoLoading } =
    useAppSelector(selectRelatedVideo);

  useEffect(() => {
    if (id) {
      dispatch(getVideoById(id));
      dispatch(getRelatedVideos(id));
    }
  }, [dispatch, id]);

  return (
    <Row>
      <Helmet>
        <title>{video?.snippet?.title}</title>
      </Helmet>
      <Col lg={8}>
        <WatchScreenPlayer>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </WatchScreenPlayer>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading...</h6>
        )}
        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={4}>
        {!loading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => {
              const obj = {
                id: video.id.videoId as string,
                kind: video.kind,
                channelId: video.snippet.channelId,
                channelTitle: video.snippet.channelTitle,
                description: video.snippet.description,
                title: video.snippet.title,
                publishedAt: video.snippet.publishedAt,
                url: video.snippet.thumbnails.medium.url,
              };

              return <VideoHorizontal video={obj} key={video.id.videoId} />;
            })
        ) : (
          <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15}></Skeleton>
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;

const WatchScreenPlayer = styled.div`
  height: 60vh;
  background-color: #353946;
  width: 100%;
  margin-bottom: 2rem;

  @media (max-width: 520px) {
    height: 35vh;
  }
`;
