
import './conversation.scss'
import Avater from '../../assets/profile/avater.png'


export default function Conversation() {
    return (
        <div className='conversation'>
            <div className="wrapper">
            <img src={Avater} alt="" />
            <span>Vhiz</span>
            </div>
        </div>
    )
}
