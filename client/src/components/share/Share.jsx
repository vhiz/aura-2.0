import { useContext, useState } from 'react'
import './share.scss'
import { AuthContext } from '../../context/authContext'
import Friend from '../../assets/friends.png'
import Image from '../../assets/img.png'
import Map from '../../assets/map.png'
import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import Avater from '../../assets/profile/avater.png'


export default function Share() {

    const [file, setFile] = useState(null)
    const [desc, setDesc] = useState('')

    const upload = async () => {
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
        (newPost) => {
            return makeRequest.post('/posts', newPost)
        }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['posts'])
        },
    })

    const { data, isLoading, } = useQuery(['users'], async () => {
        const res = await makeRequest.get(`/users`)

        return (res.data)
    })

    const handelClick = async (e) => {
        e.preventDefault()
        let imgUrl = ''
        if (file) imgUrl = await upload()
        mutation.mutate({ desc, img: imgUrl })

        setDesc("")
        setFile(null)
    }
    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        {isLoading ? "Loading" : <><img
                            src={data.profilePic ? '/upload/' + data.profilePic : Avater}
                            alt="" /><input type="text" placeholder={`What's on your mind ${data.name}?`} value={desc} onChange={(e) => setDesc(e.target.value)} /></>}
                    </div>
                    <div className="right">
                        {file && <img className='file' alt='' src={URL.createObjectURL(file)} />}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
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
    )
}
