import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ChannelHeader from "../components/ChannelHeader";
import HelmetCustom from "../components/HelmetCustom";
import Video from "../components/Video";
import { getChannelDetails } from "../features/channel/channelSlice";
import {
  getVideosByChannel,
  selectVideosChannel,
} from "../features/videosChannel/videosChannelSlice";

const ChannelScreen = () => {
  const dispatch = useAppDispatch();
  const { channelId } = useParams();
  const { loading, videos } = useAppSelector(selectVideosChannel);

  useEffect(() => {
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  return (
    <>
      <ChannelHeader />
      <HelmetCustom
        title={videos[0]?.snippet?.channelTitle}
        description={videos[0]?.snippet?.description}
      />
      <Container>
        <Row className="mt-2">
          {!loading
            ? videos?.map((video) => {
                const obj = {
                  id: video.contentDetails.videoId,
                  kind: video.kind,
                  channelId: video.snippet.channelId,
                  channelTitle: video.snippet.channelTitle,
                  description: video.snippet.description,
                  title: video.snippet.title,
                  publishedAt: video.snippet.publishedAt,
                  url: video.snippet.thumbnails.medium.url,
                };

                return (
                  <Col md={4} lg={3} key={video.id}>
                    <Video video={obj} channelScreen />
                  </Col>
                );
              })
            : [...Array(15)].map((_, i) => (
                <Col md={4} lg={3} key={i}>
                  <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="145px"></Skeleton>
                  </SkeletonTheme>
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
};

export default ChannelScreen;
