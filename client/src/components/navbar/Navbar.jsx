import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkMode";
import { AuthContext } from "../../context/authContext";
import Avater from "../../assets/profile/avater.png";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

export default function Navbar() {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/search?q=${q}`);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    logout();
    navigate("/");
  };

  const { data, isLoading } = useQuery(["users"], async () => {
    const res = await makeRequest.get(`/users`);

    return res.data;
  });
  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>Aura</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon onClick={handleClick} />
          <input
            type="text"
            placeholder="Search...."
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>
      <div className="right">
        <Person2OutlinedIcon className="icon" />
        <Link
          to={"/mesenger"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MailOutlinedIcon className="icon" />
        </Link>
        <NotificationsNoneOutlinedIcon className="icon" />
        <Link
          to={`profile/${currentUser._id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="user">
            {isLoading ? (
              "Loading"
            ) : (
              <img src={data.profilePic || Avater} alt="" />
            )}
            {isLoading ? "Loading..." : <span>{data.name}</span>}
          </div>
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
