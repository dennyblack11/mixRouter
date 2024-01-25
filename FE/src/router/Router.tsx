import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { HomeScreen } from "../pages/HomeScreen";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Verify } from "../pages/auth/Verify";
import { Preference } from "../pages/Preference";
import { PrivateRoute } from "./PrivateRoute";
import { MixedRoute } from "./MixedRoute";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MixedRoute>
          <Layout />
        </MixedRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify/:userID",
    element: <Verify />,
  },
  {
    path: "/pref",
    element: <Preference />,
  },
]);
