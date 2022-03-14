import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomeScreen from "./screens/HomeScreen";

function App() {
  const [sidebar, toggleSidebar] = useState<boolean>(false);

  const handleToggleSidebar = (): void => {
    toggleSidebar((value) => !value);
    console.log("click");
  };

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <AppContainer className="border border-info">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <BootstrapContainer fluid classsName="border border-warning">
          <HomeScreen />
        </BootstrapContainer>
      </AppContainer>
    </>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  height: 90vh;
`;

const BootstrapContainer = styled(Container)``;
