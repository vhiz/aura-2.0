import './navbar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkMode';
import { AuthContext } from '../../context/authContext';


export default function Navbar() {

    const { toggle, darkMode } = useContext(DarkModeContext)
    const { currentUser } = useContext(AuthContext)
    return (
        <div className='navbar'>
            <div className="left">
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <span>Aura</span>
                </Link>
                <HomeOutlinedIcon />
                {darkMode ? <WbSunnyOutlinedIcon onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle} />}
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder='Search....' />
                </div>
            </div>
            <div className="right">
                <Person2OutlinedIcon className='icon'/>
                <MailOutlinedIcon className='icon'/>
                <NotificationsNoneOutlinedIcon className='icon'/>
                <Link to={`profile/${currentUser.id}`} style={{ textDecoration: 'none' }}>
                    <div className="user">
                        <img src={currentUser.profilePic} alt="" />
                        <span>{currentUser.name}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
