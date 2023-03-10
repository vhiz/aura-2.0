import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbat/Rightbar";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import "./app.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkMode";
import { AuthContext } from "./context/authContext";
import Search from "./pages/search/Search";
import Mensenger from "./pages/mensenger/Mensenger";

function App() {
  const { currentUser } = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);
 

  const Layout = () => {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Leftbar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: currentUser ? <Layout /> : <Navigate to="/login" />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "profile/:id",
          element: <Profile />,
        },
        {
          path: "search",
          element: <Search />,
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
      path: "/mesenger",
      element: currentUser ? <Mensenger /> : <Navigate to={"/login"} />,
    },
  ]);
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
