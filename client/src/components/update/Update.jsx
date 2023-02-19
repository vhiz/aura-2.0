import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { makeRequest } from '../../axios'
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import './update.scss'

export default function Update({ setOpenUpdate, user }) {

    const [cover, setCover] = useState(null)
    const [profile, setProfile] = useState(null)
    const [texts, setTexts] = useState({
        email: user.email,
        password: user.password,
        name: user.name,
        city: user.city,
        website: user.website,
        phoneno: user.phoneno,
        username: user.username
    });

    const upload = async (file) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const res = await makeRequest.post('/upload', formData)
            return res.data
        } catch (error) {

        }
    }

    const queryClient = new useQueryClient()

    const mutation = useMutation(
        (user) => {
            return makeRequest.put('/users', user)
        }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['user'])
        },
    })

    const handleClick = async (e) => {
        e.preventDefault()
        let coverUrl
        let profileUrl
        let nameUpdate
        let emailUpdate
        let phonenoUpdate
        let websiteUpate
        let cityUpdate
        let usernameUpdate
        
        coverUrl = cover ? await upload(cover) : user.coverPic
        profileUrl = profile ? await upload(profile) : user.profilePic
        nameUpdate = texts.name ? texts.name : user.name
        emailUpdate = texts.email ? texts.email : user.email
        phonenoUpdate = texts.phoneno ? texts.phoneno : user.phoneno
        websiteUpate = texts.website ? texts.website : user.website
        cityUpdate = texts.city ? texts.city : user.city
        usernameUpdate = texts.username ? texts.username : user.username
        mutation.mutate({coverPic: coverUrl, profilePic: profileUrl })

        setOpenUpdate(false)
    }

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
    }
    return (
        <div className="update">
            <div className="wrapper">
                <h1>Update Your Profile</h1>
                <form>
                    <div className="files">
                        <label htmlFor="cover">
                            <span>Cover Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={
                                        cover
                                            ? URL.createObjectURL(cover)
                                            : "/upload/" + user.coverPic
                                    }
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
                        />
                        <label htmlFor="profile">
                            <span>Profile Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={
                                        profile
                                            ? URL.createObjectURL(profile)
                                            : "/upload/" + user.profilePic
                                    }
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
                        />
                    </div>
                    {/* <label>Email</label>
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
                    <input type="tel" name='phoneno' value={texts.phoneno} onChange={handleChange} />
                    <label>Username</label>
                    <input type="text" name="username" value={texts.username} onChange={handleChange} /> */}
                    <button onClick={handleClick}>Update</button>
                </form>
                <button className="close" onClick={() => setOpenUpdate(false)}>
                    close
                </button>
            </div>
        </div>
    );
}
