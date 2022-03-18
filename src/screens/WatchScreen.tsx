import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import Comments from "../components/Comments";
import VideoHorizontal from "../components/VideoHorizontal";
import VideoMetaData from "../components/VideoMetaData";

const WatchScreen = () => {
  return (
    <Row>
      <Col lg={8}>
        <WatchScreenPlayer>
          <iframe
            src="https://www.youtube.com/embed/Y8Wp3dafaMQ"
            frameBorder="0"
            title="YouTube video"
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </WatchScreenPlayer>
        <VideoMetaData />
        <Comments />
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
