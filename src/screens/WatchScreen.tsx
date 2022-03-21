import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Comments from "../components/Comments";
import VideoHorizontal from "../components/VideoHorizontal";
import VideoMetaData from "../components/VideoMetaData";
import { getVideoById, selectVideo } from "../features/video/videoSlice";

const WatchScreen = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const dispatch = useAppDispatch();
  const { video, loading } = useAppSelector(selectVideo);

  useEffect(() => {
    if (id) {
      dispatch(getVideoById(id));
    }
  }, [dispatch, id]);
  return (
    <Row>
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
        {[...Array(10)].map(() => (
          <VideoHorizontal />
        ))}
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
`;
