import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";
import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // console.log('isLoggedIn in app.jsx:', isLoggedIn)

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />


      <Route path="/login" element={isLoggedIn ? <Navigate to={'/profile'} /> : <LoginPage/> } />
      
      <Route path="/signup" element={<SignupPage />} />

      {isLoggedIn ? (
        <Route path="/profile" element={<Profile />} />
      ) : (
        <Route path="/profile" element={<LoginPage />} />
      )}

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
