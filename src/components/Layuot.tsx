import React, { FC, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../app/hooks";
import { selectAccessToken, selectLoading } from "../features/user/userSlice";
import Header from "./Header";
import Sidebar from "./Sidebar";

type LayuotProps = { children: React.ReactNode };

const Layuot: FC<LayuotProps> = ({ children }) => {
  const [sidebar, toggleSidebar] = useState<boolean>(false);
  const accessToken = useAppSelector(selectAccessToken);
  const loading = useAppSelector(selectLoading);
  const navigate = useNavigate();

  const handleToggleSidebar = (): void => {
    toggleSidebar((value) => !value);
  };
  return (
    <>
      {accessToken ? (
        <>
          <Header handleToggleSidebar={handleToggleSidebar} />
          <LayuotContainer>
            <Sidebar
              sidebar={sidebar}
              handleToggleSidebar={handleToggleSidebar}
            />
            <BootstrapContainer fluid>{children}</BootstrapContainer>
          </LayuotContainer>
        </>
      ) : (
        <Navigate to="/auth" />
      )}
    </>
  );
};

export default Layuot;

const LayuotContainer = styled.div`
  display: flex;
  margin-top: 10vh;
`;

const BootstrapContainer = styled(Container)``;
