import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CategoriesBar from "../components/CategoriesBar";
import Video from "../components/Video";
import {
  getPopularVideos,
  selectHomeVideos,
} from "../features/videos/videosSlice";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(selectHomeVideos);

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  return (
    <Container>
      <CategoriesBar />
      <Row>
        {videos.map((video) => (
          <Col lg={3} md={4} key={video.id}>
            <Video video={video} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeScreen;
