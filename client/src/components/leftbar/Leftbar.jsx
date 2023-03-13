import "./leftbar.scss";
import Friend from "../../assets/friends.png";
import Coures from "../../assets/course.png";
import Event from "../../assets/event.png";
import Fund from "../../assets/fund.png";
import Gallery from "../../assets/gallery.png";
import Game from "../../assets/game.png";
import Groups from "../../assets/groups.png";
import Market from "../../assets/market.png";
import Message from "../../assets/message.png";
import Think from "../../assets/think.png";
import Tutorial from "../../assets/tutorial.png";
import Video from "../../assets/video.png";
import Watch from "../../assets/watch.png";
import Avater from "../../assets/profile/avater.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Leftbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftbar">
      <div className="contanier">
        <div className="menu">
          <div className="user">
            <img src={currentUser.profilePic || Avater} alt="" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Friend} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Think} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Event} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Game} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Video} alt="" />
            <span>Video</span>
          </div>
          <div className="item">
            <img src={Message} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fund</span>
          </div>
          <div className="item">
            <img src={Tutorial} alt="" />
            <span>Tutorial</span>
          </div>
          <div className="item">
            <img src={Coures} alt="" />
            <span>Coures</span>
          </div>
        </div>
      </div>
    </div>
  );
}
