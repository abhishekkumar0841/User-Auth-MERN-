import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn")
    ? JSON.parse(localStorage.getItem("isLoggedIn"))
    : false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  role: localStorage.getItem("role") || "",
};

export const singUpThunk = createAsyncThunk("/user/signup", async (data) => {
  try {
    const response = axiosInstance.post("/signup", data);
    toast.promise(response, {
      loading: "Wait, Your account is creating",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Something went wrong while signup!",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const loginThunk = createAsyncThunk("/user/login", async (data) => {
  try {
    const response = axiosInstance.post("/login", data);
    toast.promise(response, {
      loading: "Wait, Checking authentication",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Something went wrong while login!l",
    });
    console.log((await response).data);
    return (await response).data;
  } catch (error) {
    toast.error("Login failed!");
  }
});

export const logoutThunk = createAsyncThunk("/user/logout", async () => {
  try {
    const response = axiosInstance.get("/logout");
    toast.promise(response, {
      loading: "Logging out",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Something went wrong while logout!",
    });
  } catch (error) {
    toast.error("Logout failed!");
  }
});

export const userThunk = createAsyncThunk("/user/profile", async () => {
  try {
    const response = axiosInstance.get("/user");
    toast.promise(response, {
      loading: "Getting profile",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Something went wrong while getting user profile!",
    });
  } catch (error) {
    toast.error("Getting profile failed!");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      console.log("ACTION OF LOGINTHUNE:", action);

      //setting values in localStorage only if action?.payload?.success because if i set the values in local storage without any check then is sets to undefined is the response is not success
      if (action?.payload?.success) {
        localStorage.setItem(
          "isLoggedIn",
          JSON.stringify(action?.payload?.success)
        );
        localStorage.setItem("user", JSON.stringify(action?.payload?.user));
        localStorage.setItem("role", action?.payload?.user?.role);
      }

      //updating state
      (state.isLoggedIn = action?.payload?.success),
        (state.user = action?.payload?.user);
      state.role = action?.payload?.user?.role;
    });

    builder.addCase(logoutThunk.fulfilled, (state) => {
      localStorage.clear();

      (state.isLoggedIn = false), (state.user = null), (state.role = "");
    });
  },
});

export default authSlice.reducer;
