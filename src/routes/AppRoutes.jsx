import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import MainLayout from "../layout/MainLayout";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <MainLayout>
              <Transactions />
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
