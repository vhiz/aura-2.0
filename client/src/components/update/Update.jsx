import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import "./update.scss";
import { AuthContext } from "../../context/authContext";
import app from "../../firebase";

export default function Update({ setOpenUpdate, user }) {
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");
  const [profilePerc, setProfilePerc] = useState(0);
  const [coverPrec, setCoverPerc] = useState(0);
  const { currentUser } = useContext(AuthContext);

  const [texts, setTexts] = useState({
    email: user?.email,
    name: user?.name,
    city: user?.city,
    website: user?.website,
    phoneno: user?.phoneno,
    username: user?.username,
  });

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
        urlType === "profilePic"
          ? setProfilePerc(Math.round(progress))
          : setCoverPerc(Math.round(progress));
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
          setTexts((prev) => ({ ...prev, [urlType]: downloadURL }));
        });
      }
    );
  };
  console.log(texts)

  useEffect(() => {
    cover && uploadFile(cover, "coverPic");
  }, [cover]);

  useEffect(() => {
    profile && uploadFile(profile, "profilePic");
  }, [profile]);

  const queryClient = new useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put(`/users/${currentUser._id}`, user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      ...texts,
    };
    mutation.mutate(user);
    setOpenUpdate(false);
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              {coverPrec > 0 ? (
                "Uploading:" + coverPrec + "%"
              ) : (
                <span>Cover Picture</span>
              )}
              <div className="imgContainer">
                <img
                  src={cover ? URL.createObjectURL(cover) : user.coverPic}
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
              accept="image/*"
            />
            <label htmlFor="profile">
              {profilePerc > 0 ? (
                "Uploading:" + profilePerc + "%"
              ) : (
                <span>Profile Picture</span>
              )}
              <div className="imgContainer">
                <img
                  src={profile ? URL.createObjectURL(profile) : user.profilePic}
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
              accept="image/*"
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <label>Phone No</label>
          <input
            type="tel"
            name="phoneno"
            value={texts.phoneno}
            onChange={handleChange}
          />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={texts.username}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
}
