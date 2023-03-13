import Error from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./online.scss";
import Avater from "../../assets/profile/avater.png";

export default function Online({ onlineUsers, setCurrentChat }) {
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const {
    error,
    isLoading,
    data: friends,
  } = useQuery(["friends", currentUser._id], async () => {
    const res = await makeRequest.get(`/users/friends/${currentUser._id}`);
    return res.data;
  });
  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await makeRequest.get(`/conversations/find/${currentUser._id}/${user._id}`);
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="online">
      {error ? (
        <Error />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {onlineFriends?.map((o) => (
            <div
              className="chatOnlineFriends"
              key={o._id}
              onClick={() => {
                handleClick(o);
              }}
            >
              <div className="imgContanier">
                <img src={o.profilePic || Avater} alt="" />
                <div className="onlinebadge"></div>
              </div>
              <span>{o.username}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
