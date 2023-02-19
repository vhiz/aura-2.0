import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbat/Rightbar";
import Profile from './pages/profile/Profile'
import Home from './pages/home/Home'
import './app.scss'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkMode";
import { AuthContext } from "./context/authContext";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Mensenger from "./pages/mensenger/Mensenger";
import Conversation from "./components/conversations/Conversation";
import Online from "./components/online/Online";

function App() {
  const { currentUser } = useContext(AuthContext)

  const { darkMode } = useContext(DarkModeContext)
  const queryClient = new QueryClient()


  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>

        <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
          <Navbar />
          <div style={{ display: 'flex' }}>
            <Leftbar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <Rightbar />
          </div>
        </div>
      </QueryClientProvider>
    )
  }



  const Layout2 = () => {
    return (
      <QueryClientProvider client={queryClient}>

        <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
          <Navbar />
          <div style={{ display: 'flex' }}>
            <Conversation />
            <div style={{ flex: 6, }}>
              <Outlet />
            </div>
            <Online />
          </div>
        </div>
      </QueryClientProvider>
    )
  }



  const router = createBrowserRouter([
    {
      path: "/",
      element: (currentUser ? <Layout /> : <Navigate to='/login' />),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: 'profile/:id',
          element: <Profile />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/',
      element: (currentUser ? <Layout2 /> : <Navigate to='/login' />),
      children:[
        {
          path:"/mensenger",
          element: <Mensenger/>
        }
      ]
    }
  ])
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
