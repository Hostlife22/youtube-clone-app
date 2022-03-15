import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Layuot from "./components/Layuot";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layuot>
              <HomeScreen />
            </Layuot>
          }
        />
        <Route
          path="search"
          element={
            <Layuot>
              <h1>Search Result</h1>
            </Layuot>
          }
        />
        <Route path="auth" element={<LoginScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
