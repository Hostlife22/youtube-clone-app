import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import HelmetCustom from "../components/HelmetCustom";
import VideoHorizontal from "../components/VideoHorizontal";
import {
  getVideosBySearch,
  selectSearchedVideos,
} from "../features/search/searchSlice";

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useAppDispatch();
  const { videos, loading } = useAppSelector(selectSearchedVideos);
  const title = query
    ?.replaceAll("20%", "")
    .split(" ")
    .filter((el) => el !== "")
    .join(" ");

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [query, dispatch]);

  return (
    <Container>
      <HelmetCustom title={title} />

      {!loading ? (
        videos?.map((video) => {
          const obj = {
            id: video.id.videoId as string,
            kind: video.id.kind,
            channelId: video.snippet.channelId,
            channelTitle: video.snippet.channelTitle,
            description: video.snippet.description,
            title: video.snippet.title,
            publishedAt: video.snippet.publishedAt,
            url: video.snippet.thumbnails.medium.url,
          };
          return (
            <VideoHorizontal video={obj} key={video.id.videoId} searchScreen />
          );
        })
      ) : (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20}></Skeleton>
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchScreen;
