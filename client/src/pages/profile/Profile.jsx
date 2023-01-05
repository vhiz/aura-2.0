import './profile.scss'
import Email from '../../assets/profile/email.png'
import Facbook from '../../assets/profile/facbook.png'
import Instagram from '../../assets/profile/instagram.png'
import Language from '../../assets/profile/language.png'
import Linkedin from '../../assets/profile/linkedin.png'
import Pintrest from '../../assets/profile/pintrest.png'
import Place from '../../assets/profile/place.png'
import Twitter from '../../assets/profile/twitter.png'
import Vertical from '../../assets/profile/vertical.png'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import Posts from '../../components/posts/Posts'


export default function Profile() {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className='profile'>
      <div className="images">
        <img src={currentUser.coverPic} alt="" className="cover" />
        <img src={currentUser.profilePic} alt="" className="profile" />
      </div>
      <div className="profileContanier">
        <div className="uInfo">
          <div className="left">
            <a href="http://facbook.com">
              <img src={Facbook} alt="" />
            </a>
            <a href="http://facbook.com">
              <img src={Instagram} alt="" />
            </a>
            <a href="http://facbook.com">
              <img src={Twitter} alt="" />
            </a>
            <a href="http://facbook.com">
              <img src={Linkedin} alt="" />
            </a>
            <a href="http://facbook.com">
              <img src={Pintrest} alt="" />
            </a>
          </div>
          <div className="center">
            <span>{currentUser.name}</span>
            <div className="info">
              <div className="item">
                <img src={Place} alt="" />
                <span>Nigeria</span>
              </div>
              <div className="item">
                <img src={Language} alt="" />
                <span>Igbo</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <img src={Email} alt="" />
            <img src={Vertical} alt="" />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  )
}
