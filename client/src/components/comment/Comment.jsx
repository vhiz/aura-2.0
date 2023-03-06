import "./comment.scss";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import Avater from "../../assets/profile/avater.png";
import { CircularProgress } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";

export default function Comment({ comment }) {
  const { error, isLoading, data } = useQuery(
    ["commentUser", comment.userId],
    async () => {
      const res = await makeRequest.get(`/users/find/${comment.userId}`);

      return res.data;
    }
  );
  return (
    <>
      <Link
        to={`/profile/${data._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="comment">
          <>
            {error ? (
              <ErrorIcon />
            ) : isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <img src={data.profilePic || Avater} alt="" />
                <div className="info">
                  <span>{data.name}</span>
                  <p>{comment.desc}</p>
                </div>
                <span className="date">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </>
            )}
          </>
        </div>
      </Link>
    </>
  );
}
