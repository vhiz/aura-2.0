import './message.scss'
import Avater from '../../assets/profile/avater.png'

export default function Message({own}) {
    return (
        <div className={own ?'message own' : "message"}>
            <div className="messageTop">
                <img src={Avater} alt="" />
                <p>hi there</p>
            </div>
            <div className="messageBottom">
                1 hr ago
            </div>
        </div>
    )
}
