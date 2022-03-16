import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

const SkeletonVideo = () => {
  return (
    <SkeletonContainer>
      <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
        <Skeleton height={180} inline />
        <div>
          <Skeleton
            style={{ margin: "0.5rem" }}
            height={40}
            width={40}
            inline
            circle
          />
          <Skeleton height={40} width="72%" inline />
        </div>
      </SkeletonTheme>
    </SkeletonContainer>
  );
};

export default SkeletonVideo;

const SkeletonContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
`;
