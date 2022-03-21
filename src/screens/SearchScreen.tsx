import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import VideoHorizontal from "../components/VideoHorizontal";
import {
  getVideosBySearch,
  selectSearchedVideos,
} from "../features/search/searchSlice";

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useAppDispatch();
  const { videos, loading } = useAppSelector(selectSearchedVideos);

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  return (
    <Container>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal video={video} key={video.id.videoId} searchScreen />
        ))
      ) : (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20}></Skeleton>
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
