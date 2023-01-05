import { useContext } from 'react'
import './stories.scss'
import { AuthContext } from '../../context/authContext'

export default function Stories() {
    const { currentUser } = useContext(AuthContext)

    const stories = [
        {
            id: 1,
            name: "Marge Simpson",
            img: "https://images7.alphacoders.com/467/thumbbig-467181.webp"
        },
        {
            id: 2,
            name: "Bart Simpson",
            img: "https://images7.alphacoders.com/391/thumbbig-391979.webp"
        },
        {
            id: 3,
            name: "Lois Griffin",
            img: "https://images7.alphacoders.com/405/thumbbig-405865.webp"
        },
        {
            id: 4,
            name: "Magie Simpson",
            img: "https://images5.alphacoders.com/468/thumbbig-468647.webp"
        },
        

    ]

    return (
        <div className='stories'>
            <div className="story">
                <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>
            {stories.map(story => (
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}
