import React, { FC, useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

type LayuotProps = { children: React.ReactNode };

const Layuot: FC<LayuotProps> = ({ children }) => {
  const [sidebar, toggleSidebar] = useState<boolean>(false);

  const handleToggleSidebar = (): void => {
    toggleSidebar((value) => !value);
  };
  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <LayuotContainer>
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <BootstrapContainer fluid>{children}</BootstrapContainer>
      </LayuotContainer>
    </>
  );
};

export default Layuot;

const LayuotContainer = styled.div`
  display: flex;
  margin-top: 10vh;
`;

const BootstrapContainer = styled(Container)``;
