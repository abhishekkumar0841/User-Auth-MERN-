import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import HomePage from "./Components/HomePage";
import Profile from "./Components/Profile";
import ErrorPage from "./Components/ErrorPage";
import { useSelector } from "react-redux";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  console.log('isLoggedIn in app.jsx:', isLoggedIn)

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
