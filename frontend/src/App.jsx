import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./App.scss";

function SignUpPage() {
  return <div>SIGN</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
