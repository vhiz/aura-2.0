import { useEffect, useRef, useState, } from 'react'
import Message from '../../components/message/Message'
import './mensenger.scss'
import { io } from 'socket.io-client'


export default function Mensenger() {
    const socket = useRef()
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [currentChat, setCurrentChat] = useState(null)


    useEffect(() => {
        socket.current = io('ws://localhost:3001')

        socket.current.on('getMessage', data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    // useEffect(() => {
    //     arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    //         setMessages((prev) => [...prev, arrivalMessage])
    // }, [arrivalMessage, currentChat])

    return (
        <div className='chatBox'>
            <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                    <Message />
                    <Message own={true} />
                </div>
                <div className="chatBoxBottom">
                    <textarea placeholder='Chat.......'></textarea>
                    <button>Send</button>
                </div>
            </div>
        </div>
    )
}
