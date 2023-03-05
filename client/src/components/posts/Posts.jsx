import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios.js";
import { CircularProgress } from "@mui/material";
import Error from "@mui/icons-material/Error";

export default function Posts({ userId }) {
  const { isLoading, error, data } = useQuery(["posts"], async () => {
    const res = userId
      ? await makeRequest.get(`/posts/${userId}`)
      : await makeRequest.get(`/posts`);

    return res.data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    });
  });

  return (
    <div className="posts">
      {error ? (
        <Error />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        data.map((post) => (
          <Post post={post} key={post._id} userId={post.userId} />
        ))
      )}
    </div>
  );
}
