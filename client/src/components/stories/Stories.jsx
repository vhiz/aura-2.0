import "./stories.scss";
import Avater from "../../assets/profile/avater.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

export default function Stories() {
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const {
    data: storyData,
    isLoading: storyLoading,
    error,
  } = useQuery(["stories", currentUser], async () => {
    const res = await makeRequest.get(`/story/${currentUser._id}`);

    return res.data;
  });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {}
  };

  const queryClient = new useQueryClient();

  const mutation = useMutation(
    (newStory) => {
      return makeRequest.post("/story", newStory);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["story"]);
      },
    }
  );

  const handelClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ img: imgUrl });
    setFile(null);
  };

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic || Avater} alt="" />
        <span>{currentUser.name}</span>

        <button>+</button>
      </div>
      {error
        ? "Something went wrong"
        : storyLoading
        ? "loading"
        : storyData.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.img} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
    </div>
  );
}
