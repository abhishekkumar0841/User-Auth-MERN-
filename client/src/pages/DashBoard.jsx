import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async (token) => {
    const response = await fetch("http://localhost:4000/api/auth/user", {
      method: "GET",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      credentials: "include", //include credentials (cookies) with the request
    });

    if (response.status !== 200) {
      navigate("/login");
    }

    const userData = await response.json();
    setUser(userData);

    console.log("USER DATA-->", userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {/* {userData ? (
        <div>
          <img
            src="https://th.bing.com/th?id=OIP.awAiMS1BCAQ2xS2lcdXGlwHaHH&w=255&h=245&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="User Image"
          />
          <h1>
            Username: {userData.firstName} {userData.lastName}
          </h1>
          <h3>Username: {userData.userName}</h3>
          <p>Bio: {userData.bio}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <div>No User Found</div>
      )} */}
    </div>
  );
};

export default DashBoard;
