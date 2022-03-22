import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import Layuot from "./components/Layuot";
import { selectAccessToken, selectLoading } from "./features/user/userSlice";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionsScreen from "./screens/SubscriptionsScreen";
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
        path="search/:query"
        element={
          <Layuot>
            <SearchScreen />
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
      <Route
        path="feed/subscriptions"
        element={
          <Layuot>
            <SubscriptionsScreen />
          </Layuot>
        }
      />
      <Route path="channel/:channelId" element={<h1>xhabbel</h1>} />
      <Route path="auth" element={<LoginScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
