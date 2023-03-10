import Error from "@mui/icons-material/Error";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import "./rightbar.scss";
import Avater from "../../assets/profile/avater.png";

export default function Rightbar() {
  const { error, data, isLoading } = useQuery(["sugeted"], async () => {
    const res = await makeRequest.get(`/users/suggested`);

    return res.data;
  });
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
          <div className="user">
            <div className="userInfo">
              <img
                src="https://wallpapers.com/images/high/sorrowful-peter-griffin-pfi29qp59bmvsbcj.webp"
                alt=""
              />
              <div className="online" />
              <span>Peter Grifin</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://c4.wallpaperflare.com/wallpaper/486/223/659/family-guy-lois-griffin-wallpaper-preview.jpg"
                alt=""
              />
              <div className="online" />
              <span>Lois Griffin</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC0FXGF5pmRyi1GGu8Bbbuw3Gbio_EPsTUnA&usqp=CAU"
                alt=""
              />
              <div className="online" />
              <span>Marge Simpon</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images2.alphacoders.com/467/thumbbig-467171.webp"
                alt=""
              />
              <div className="online" />
              <span>Maggie Simpson</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://www.pngitem.com/pimgs/m/93-937041_chris-griffin-by-mighty355-chris-family-guy-costume.png"
                alt=""
              />
              <div className="online" />
              <span>Chris Griffin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
