import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import AuthRoute from "./AuthRoute";
import NoAuthRoute from "./NoAuthRoute";

export const Navigation = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <NoAuthRoute>
            <Home />
          </NoAuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
    </Routes>
  );
};
