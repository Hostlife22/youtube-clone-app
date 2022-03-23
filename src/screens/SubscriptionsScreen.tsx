import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import VideoHorizontal from "../components/VideoHorizontal";
import {
  getSubscribedChannels,
  selectSubsctiptions,
} from "../features/channels/videoChannelsSlice";

const SubscriptionsScreen = () => {
  const dispatch = useAppDispatch();
  const { loading, videos } = useAppSelector(selectSubsctiptions);

  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);

  return (
    <SubscriptionsContainer fluid>
      {!loading ? (
        videos?.map((video) => {
          const obj = {
            id: video.id,
            kind: video.kind,
            channelId: video.snippet.channelId,
            description: video.snippet.description,
            title: video.snippet.title,
            publishedAt: video.snippet.publishedAt,
            url: video.snippet.thumbnails.medium.url,
            resourceId: video.snippet.resourceId.channelId,
            totalItemCount: video.contentDetails.totalItemCount,
          };
          return <VideoHorizontal video={obj} key={video.id} subsScreen />;
        })
      ) : (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20}></Skeleton>
        </SkeletonTheme>
      )}
    </SubscriptionsContainer>
  );
};

export default SubscriptionsScreen;

const SubscriptionsContainer = styled(Container)``;
