import Error from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import "./message.scss";
import Avater from "../../assets/profile/avater.png";
import moment from "moment";

export default function Message({ own, message }) {
  const { error, data, isLoading } = useQuery(
    ["messageSender", message.sender],
    async () => {
      const res = await makeRequest.get(`/users/find/${message.sender}`);

      return res.data;
    }
  );
  return (
    <div className={own ? "message own" : "message"}>
      {error ? (
        <Error />
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="top">
            <img src={data.profilePic || Avater} alt="" />
            <p>{message.text}</p>
          </div>
          <div className="bottom">{moment(message.createdAt).fromNow()}</div>
        </>
      )}
    </div>
  );
}
