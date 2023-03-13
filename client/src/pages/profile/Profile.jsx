import "./profile.scss";
import Email from "../../assets/profile/email.png";
import Facbook from "../../assets/profile/facbook.png";
import Instagram from "../../assets/profile/instagram.png";
import Language from "../../assets/profile/language.png";
import Linkedin from "../../assets/profile/linkedin.png";
import Pintrest from "../../assets/profile/pintrest.png";
import Place from "../../assets/profile/place.png";
import Twitter from "../../assets/profile/twitter.png";
import Vertical from "../../assets/profile/vertical.png";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import Avater from "../../assets/profile/avater.png";
import Cover from "../../assets/profile/coverPic.jpg";

export default function Profile() {
  const userId = useLocation().pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);

  const { isLoading, data } = useQuery(["user", userId], async () => {
    const res = await makeRequest.get(`/users/find/${userId}`);
    return res.data;
  });

  const { isLoading: relationshipIsLoading, data: relationshipData } = useQuery(
    ["relationship", userId],
    async () => {
      const res = await makeRequest.get(
        `/relationships?followedUserId=${userId}`
      );
      return res.data;
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete(
          `/relationships/${currentUser._id}?userId=${userId}`
        );
      return makeRequest.post(`/relationships/${currentUser._id}`, { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const mutationC = useMutation(
    (newConversation) => {
      return makeRequest.post(
        `/conversations/${currentUser._id}`,
        newConversation
      );
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["conversation"]);
      },
    }
  );

  const handleFollow = async (e) => {
    e.preventDefault();
    mutation.mutate(relationshipData.includes(currentUser._id));

    const newConversation = {
      receiverId: userId,
    };
    mutationC.mutate(newConversation);
  };
  return (
    <div className="profile">
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <div className="images">
            <img src={data.coverPic || Cover} alt="" className="cover" />
            <img src={data.profilePic || Avater} alt="" className="profile" />
          </div>
          <div className="profileContanier">
            <div className="uInfo">
              <div className="left">
                <a href="http://facbook.com">
                  <img src={Facbook} alt="" />
                </a>
                <a href="http://instagram.com">
                  <img src={Instagram} alt="" />
                </a>
                <a href="http://twitter.com">
                  <img src={Twitter} alt="" />
                </a>
                <a href="http://linkedin.com">
                  <img src={Linkedin} alt="" />
                </a>
                <a href="http://pintrest.com">
                  <img src={Pintrest} alt="" />
                </a>
              </div>
              <div className="center">
                <span>{data.name}</span>
                <div className="info">
                  <div className="item">
                    <img src={Place} alt="" />
                    <span>{data.city}</span>
                  </div>
                  <div className="item">
                    <img src={Language} alt="" />
                    <span>{data.website}</span>
                  </div>
                </div>
                {relationshipIsLoading ? (
                  "Loading"
                ) : userId === currentUser._id ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser._id)
                      ? "following"
                      : "follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <img src={Email} alt="" />
                <span>{data.email}</span>
                <img src={Vertical} alt="" />
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
}
