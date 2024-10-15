import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import RiotPage from "./pages/RiotPage.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DataPage from "./pages/DataPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <DataPage /> },
      { path: "/riot", element: <RiotPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);