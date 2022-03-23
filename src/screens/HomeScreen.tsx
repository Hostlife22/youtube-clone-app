import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CategoriesBar from "../components/CategoriesBar";
import HelmetCustom from "../components/HelmetCustom";
import SkeletonVideo from "../components/SkeletonVideo";
import Video from "../components/Video";
import {
  getPopularVideos,
  getVideosCategory,
  selectActiveCategory,
  selectHomeVideos,
  selectVideosLoading,
} from "../features/videos/videosSlice";

interface IVideoID {
  kind: string;
  videoId: string;
}

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(selectHomeVideos);
  const activeCategory = useAppSelector(selectActiveCategory);
  const loading = useAppSelector(selectVideosLoading);

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosCategory(activeCategory));
    }
  };

  return (
    <Container>
      <HelmetCustom />
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <Loader>
            <div className="spinner-border text-danger d-block mx-auto"></div>
          </Loader>
        }
        className="row"
      >
        {!loading
          ? videos.map((video) => {
              const _id = video.id as any as IVideoID;
              const _videoId = _id?.videoId || video.id;
              const obj = {
                id: _videoId,
                kind: video.kind,
                channelId: video.snippet.channelId,
                channelTitle: video.snippet.channelTitle,
                description: video.snippet.description,
                title: video.snippet.title,
                publishedAt: video.snippet.publishedAt,
                url: video.snippet.thumbnails.medium.url,
              };

              return (
                <Col lg={3} md={4} key={_videoId}>
                  <Video video={obj} />
                </Col>
              );
            })
          : [...Array(20)].map((_, i) => (
              <Col lg={3} md={4} key={i}>
                <SkeletonVideo />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  );
};

export default HomeScreen;

const Loader = styled.div`
  display: block;
  height: 32px;
  overflow: hidden;
`;
