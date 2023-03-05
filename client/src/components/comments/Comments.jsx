import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";
import Avater from "../../assets/profile/avater.png";
import { CircularProgress } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import Comment from "../comment/Comment.jsx";

export default function Comments({ postId }) {
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  const { error, isLoading, data } = useQuery(["comments"], async () => {
    const res = await makeRequest.get(`/comments?postId=${postId}`);

    return res.data.sort((c1, c2) => {
      return new Date(c2.createdAt) - new Date(c1.createdAt);
    });
  });

  const queryClient = new useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handelClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img
          src={
            currentUser.profilePic
              ? "/upload/" + currentUser.profilePic
              : Avater
          }
          alt=""
        />
        <input
          type="text"
          placeholder="Comment......."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handelClick}>Send</button>
      </div>
      {error ? (
        <ErrorIcon />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        data.map((comment) => <Comment comment={comment} />)
      )}
    </div>
  );
}
