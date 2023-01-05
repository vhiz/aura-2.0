import './post.scss'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { Link } from 'react-router-dom'
import Comments from '../comments/Comments';
import { useState } from 'react';

export default function Post({ post }) {

    const [commentOpen, setCommentOpen] = useState(false)

    const liked = false
    return (
        <div className='post'>
            <div className="contanier">

                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span>{post.name}</span>
                            </Link>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizOutlinedIcon />
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        {liked ? <FavoriteOutlinedIcon htmlColor='red' /> : <FavoriteBorderOutlinedIcon />}
                        20 Likes
                    </div>
                    <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        20 Commonts
                    </div>
                    <div className="item">
                       <ShareOutlinedIcon/>
                        Share
                    </div>
                </div>
                {commentOpen && <Comments/>}
            </div>
        </div>
    )
}
