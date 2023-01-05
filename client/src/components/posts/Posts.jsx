import Post from '../post/Post'
import './posts.scss'

export default function Posts() {

    const posts= [
        {
            id:1,
            name:"Marge Simpson",
            userId: 2,
            profilePic:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC0FXGF5pmRyi1GGu8Bbbuw3Gbio_EPsTUnA&usqp=CAU",
            img:"https://images2.alphacoders.com/125/thumbbig-1257405.webp",
            desc:"whats happeing in the world"
        },
        {
            id:2,
            name:"Petter Griffin",
            userId: 1,
            profilePic:"https://images6.alphacoders.com/403/thumbbig-403867.webp",
            img:"https://images4.alphacoders.com/248/thumbbig-248798.webp",
            desc:"This guy self"
        }
    ]
  return (
    <div className='posts'>
        {posts.map(post=>(
            <Post post={post} key={post.id}/>
        ))}
    </div> 
  )
}
