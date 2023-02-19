import { useContext } from 'react'
import './comments.scss'
import { AuthContext } from '../../context/authContext'
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { useState } from 'react'
import Avater from '../../assets/profile/avater.png'

export default function Comments({ postId }) {
    const [desc, setDesc] = useState('')

    const { currentUser } = useContext(AuthContext)

    const { isLoading, data } = useQuery(['comments'], async () => {
        const res = await makeRequest.get(`/comments?postId=${postId}`)

        return (res.data.sort((c1, c2) => {
            return new Date(c2.createdAt) - new Date(c1.createdAt)
        }))
    })


    const { isLoading: Loading, data: userData } = useQuery(['users'], async () => {
        const res = await makeRequest.get(`/users`)

        return (res.data)
    })

    const { isLoading: LoadingC, data: userDataC } = useQuery(['users'], async () => {
        const res = await makeRequest.get(`/users/${data.userId}`)

        return (res.data)
    })

    const queryClient = new useQueryClient()

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post('/comments', newComment)
        }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['comments'])
        },
    })

    const handelClick = async (e) => {
        e.preventDefault()
        mutation.mutate({ desc, postId })
        setDesc("")
    }


    return (
        <div className='comments'>
            <div className="write">
                {Loading ? "Loading" : <><img src={userData.profilePic ? "/upload/" + userData.profilePic : Avater} alt="" /><input type="text" placeholder='Comment.......' value={desc} onChange={(e) => setDesc(e.target.value)} /><button onClick={handelClick}>Send</button></>}
            </div>
            {isLoading
                ? 'Loading'
                : data.map(comment => (
                    <div className="comment">
                        <img src={userDataC.profilePic ? "/upload/"+userDataC.profilePic : Avater} alt="" />
                        <div className="info">
                            <span>{userDataC.name}</span>
                            <p>{comment.desc}</p>
                        </div>
                        <span className='date'>{moment(comment.createdAt).fromNow()}</span>

                    </div>
                ))}
        </div>
    )
}
