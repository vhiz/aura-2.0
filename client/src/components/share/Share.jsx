import { useContext, useEffect, useState } from "react";
import "./share.scss";
import { AuthContext } from "../../context/authContext";
import Friend from "../../assets/friends.png";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Avater from "../../assets/profile/avater.png";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Share() {
  const [info, setInfo] = useState({});
  const [img, setImg] = useState("");
  const [imgPrec, setImgPerc] = useState(0);

  const queryClient = new useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const { data, isLoading } = useQuery(["users"], async () => {
    const res = await makeRequest.get(`/users`);

    return res.data;
  });

  const handelClick = async (e) => {
    e.preventDefault();
    const newPost = {
      ...info,
    };

    mutation.mutate(newPost);
    setImg(null);
    setImgPerc(0)
    setInfo(null)
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new window.Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImgPerc(Math.round(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInfo((prev) => ({ ...prev, [urlType]: downloadURL }));
        });
      }
    );
  };

  useEffect(() => {
    img && uploadFile(img, "img");
  }, [img]);
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {isLoading ? (
              "Loading"
            ) : (
              <>
                <img src={data.profilePic || Avater} alt="" />
                <input
                  type="text"
                  placeholder={`What's on your mind ${data.name}?`}
                  onChange={handleChange}
                  id="desc"
                />
              </>
            )}
          </div>
          <div className="right">
            {imgPrec > 0 && "Uploading:" + imgPrec + "%"}
            {img && (
              <img className="file" alt="" src={URL.createObjectURL(img)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handelClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
}
