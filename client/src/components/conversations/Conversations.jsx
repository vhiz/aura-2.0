import Error from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./conversation.scss";
import Avater from "../../assets/profile/avater.png";

export default function Conversations({ conversation }) {
  const { currentUser } = useContext(AuthContext);
  const friendId = conversation.members.find((m) => m !== currentUser._id);
  
  const { error, data, isLoading } = useQuery(
    ["conversationUser", friendId],
    async () => {
      const res = await makeRequest.get(`/users/find/${friendId}`);

      return res.data;
    }
  );
  return (
    <div className="conversation">
      {error ? (
        <Error />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <img src={data?.profilePic || Avater} alt="" />
          <span>{data?.username}</span>
        </>
      )}
    </div>
  );
}
