import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import DriverLogs from "./routes/DriverLogs";
import LiveTracking from "./routes/LiveTracking";

// import reportWebVitals from "./reportWebVitals";
import theme from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DriverLogs />,
  },
  {
    path: "/live-tracking",
    element: <LiveTracking />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
