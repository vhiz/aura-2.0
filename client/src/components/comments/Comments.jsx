import { useContext } from 'react'
import './comments.scss'
import { AuthContext } from '../../context/authContext'
export default function Comments() {

    const { currentUser } = useContext(AuthContext)

    const comments = [
        {
            id: 1,
            name: "Marge Simpson",
            userId: 2,
            profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC0FXGF5pmRyi1GGu8Bbbuw3Gbio_EPsTUnA&usqp=CAU",
            desc: "whats happeing in the world"
        },
        {
            id: 2,
            name: "Petter Griffin",
            userId: 1,
            profilePic: "https://images6.alphacoders.com/403/thumbbig-403867.webp",
            desc: "This guy self"
        }
    ]
    return (
        <div className='comments'>
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder='Comment.......' />
                <button>Send</button>
            </div>
            {comments.map(comment => (
                <div className="comment">
                    <img src={comment.profilePic} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>1 hour ago</span>

                </div>
            ))}
        </div>
    )
}
