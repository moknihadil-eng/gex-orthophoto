import React from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/layout/Layout";
import HomeLayout from "./components/layout/HomeLayout";
import AdminDashboardPage from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import ApiTestPage from "./pages/ApiTestPage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="homepage" element={<Navigate to="/" replace />} />
            {process.env.NODE_ENV === "development" && <Route path="test-api" element={<ApiTestPage />} />}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route element={<ProtectedRoute admin={true} />}>
            <Route path="/admindashboard" element={<HomeLayout />}>
              <Route index element={<AdminDashboardPage />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<HomeLayout />}>
              <Route index element={<AdminDashboardPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
