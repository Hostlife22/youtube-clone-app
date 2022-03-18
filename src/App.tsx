import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import Layuot from "./components/Layuot";
import { selectAccessToken, selectLoading } from "./features/user/userSlice";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import WatchScreen from "./screens/WatchScreen";

function App() {
  const accessToken = useAppSelector(selectAccessToken);
  const loading = useAppSelector(selectLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/auth");
    }
  }, [accessToken, loading, navigate]);

  return (
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
      <Route
        path="watch/:id"
        element={
          <Layuot>
            <WatchScreen />
          </Layuot>
        }
      />
      <Route path="auth" element={<LoginScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
