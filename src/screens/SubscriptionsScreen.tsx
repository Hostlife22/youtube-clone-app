import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import VideoHorizontal from "../components/VideoHorizontal";
import {
  getVideosByChannel,
  selectSubsctiptions,
} from "../features/channels/videoChannelsSlice";

const SubscriptionsScreen = () => {
  const dispatch = useAppDispatch();
  const { loading, videos } = useAppSelector(selectSubsctiptions);

  useEffect(() => {
    dispatch(getVideosByChannel());
  }, [dispatch]);

  return (
    <SubscriptionsContainer fluid>
      {!loading ? (
        videos?.map((video) => (
          <VideoHorizontal video={video} key={video.id} subsScreen />
        ))
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
