import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (getState().auth.userInfo) {
        const user = getState().auth.userInfo;
        const token = user.token;
        if (user.role === "ADMIN") {
          headers.set("Authorization", `Bearer ${token}`);
        } else if (user && endpoint !== "refresh") {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      }
    },
    credentials: "include", // This allows the server to set cookies
  }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: () => ({}),
});
