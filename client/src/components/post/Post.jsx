import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import Avater from "../../assets/profile/avater.png";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import Error from "@mui/icons-material/Error";

export default function Post({ post, userId }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const [like, setLike] = useState(post.likes.length);
  const [isliked, setisLiked] = useState(false);

  const likeHandeler = () => {
    try {
      makeRequest.put(`/likes/${post._id}/like`);
    } catch (error) {
      console.log(error);
    }
    setLike(isliked ? like - 1 : like + 1);
    setisLiked(!isliked);
  };

  useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const { error, data, isLoading } = useQuery(["post", userId], async () => {
    const res = await makeRequest.get(`/users/find/${userId}`);

    return res.data;
  });

  const {
    error: commentError,
    data: commentsD,
    isLoading: Loading,
  } = useQuery(["comments", post._id], async () => {
    const res = await makeRequest.get(`/comments?postId=${post._id}`);

    return res.data;
  });

  return (
    <div className="post">
      <div className="contanier">
        <div className="user">
          <div className="userInfo">
            {error ? (
              <Error />
            ) : isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <img src={data.profilePic || Avater} alt="" />
                <div className="details">
                  <Link
                    to={`/profile/${post.userId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span>{data.name}</span>
                  </Link>
                  <span className="date">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
              </>
            )}
          </div>
          <MoreHorizOutlinedIcon />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post?.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isliked ? (
              <FavoriteOutlinedIcon htmlColor="red" onClick={likeHandeler} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={likeHandeler} />
            )}
            {like} Likes
          </div>
          {commentError ? (
            <Error />
          ) : Loading ? (
            <CircularProgress />
          ) : (
            <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
              <TextsmsOutlinedIcon />
              {commentsD.length} Comments
            </div>
          )}
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post._id} />}
      </div>
    </div>
  );
}
