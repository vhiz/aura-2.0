import Error from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./rightbar.scss";
import Avater from "../../assets/profile/avater.png";
import Online from "../online/Online";
import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/authContext";

export default function Rightbar() {
  const { currentUser } = useContext(AuthContext);
  const { error, data, isLoading } = useQuery(["sugeted"], async () => {
    const res = await makeRequest.get(`/users/suggested`);

    return res.data;
  });
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("https://auraapi.onrender.com");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [currentUser]);
  return (
    <div className="rightbar">
      <div className="contanier">
        <div className="item">
          <span>Suggestions</span>
          {error ? (
            <Error />
          ) : isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {data.map((user) => (
                <div className="user" key={user._id}>
                  <div className="userInfo" key={user._id}>
                    <img src={user.profilePic || Avater} alt="" />
                    <span>{user.username}</span>
                  </div>
                  <div className="buttons">
                    <button>
                      <Link
                        to={`/profile/${user._id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        View
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="item">
          <span>Online friends</span>
          <Online onlineUsers={onlineUsers} />
        </div>
      </div>
    </div>
  );
}
