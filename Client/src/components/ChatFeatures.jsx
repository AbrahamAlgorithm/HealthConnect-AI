import { IoCall } from 'react-icons/io5';
import DoctorDp from '../Assets/Images/Profile DP.jpg';
import { Link } from "react-router-dom";
import { IoMdVideocam } from "react-icons/io";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

const ChatFeatures = () => {
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
    const [chatRoomNum, setChatRoomNum] = useState();
    const [currentChat, setCurrentChat] = useState({});
    const [openChat, setOpenChat] = useState(false);

    const consultantsDetails = [
        {
            consultantName: 'Dr Alison',
            consultantRole: 'Practitioner',
            roomNum: 1,
            doctorDp: DoctorDp,
        },
        {
            consultantName: 'Habeeb',
            consultantRole: 'Student',
            roomNum: 2,
            doctorDp: DoctorDp,
        },
        {
            consultantName: 'Mr Muhammed',
            consultantRole: 'Intern',
            roomNum: 3,
            doctorDp: DoctorDp,
        },
        {
            consultantName: 'Dr Aishat',
            consultantRole: 'Specialist',
            roomNum: 4,
            doctorDp: DoctorDp,
        },
    ];

    // Sends message to the back
    const sendMessage = () => {
        socket.emit('send_message', { message, chatRoomNum })
    };

    // Joins a room to chat a specific doctor
    const joinRoom = () => {
        if (chatRoomNum !== '') {
            socket.emit('join_room', chatRoomNum)
        }
    };
    // Receives sent message from the back and display it
    useEffect(() => {
        socket.on('receive_message', (data) => {
            if (data.senderId !== socket.id) {
                setReceivedMessage(data.message);
            }
        });
    }, [socket]);


    return (
        <div className='chat-features'>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px', flexBasis: '20%' }}>
                <p style={{ marginBottom: '40px', fontFamily: 'PlusJarkataSanExtraBold', color: '#101928', fontSize: '20px' }}>Consultants</p>
                <div className='consultants-chats-container'>
                    <div className='consultant-chat-container'>
                        <div className="consultants-chat-details">
                            {consultantsDetails.map((consultantDetail) => {
                                return (
                                    <Link onClick={()=>{setChatRoomNum(consultantDetail.roomNum); joinRoom(); setCurrentChat(consultantDetail); setOpenChat(true)}}>
                                        <div className="consultant-chat-details-container">
                                            <div style={{ padding: '10px 0' }} className="consultant-details">
                                                <div style={{ position: 'relative' }}>
                                                    <img src={DoctorDp} alt="" style={{ width: '50px', height: '50px' }} />
                                                    <div style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: "#04802E", borderRadius: '50%', right: '0', bottom: '10px', border: '2px solid #fff' }}></div>
                                                </div>
                                                <div>
                                                    <p className="consultant-name">{consultantDetail.consultantName}</p>
                                                    <p className="consultant-specialization">{consultantDetail.consultantRole}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '1px', height: '100vh', backgroundColor: "#e4e7ec" }}></div>
            {openChat ? <div className='chat-container'>
                <div className='chat-container-head'>
                    <div className='recepient-details'>
                        <img src={currentChat.doctorDp} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="Recepient Pics" />
                        <p>{currentChat.consultantName}</p>
                    </div>
                    <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '20px' }}>
                        <IoCall style={{ fontSize: '25px', cursor: 'pointer' }} />
                        <IoMdVideocam style={{ fontSize: '25px', cursor: 'pointer' }} />
                    </div>
                </div>
                <div className='chat-display-area'>
                    <p>{receivedMessage}</p>
                </div>
                <div className='chat-input-area'>
                    <HiOutlinePlusCircle style={{ fontSize: '30px', marginRight: '10px', cursor: "pointer" }} />
                    <MdOutlineEmojiEmotions style={{ fontSize: '30px', marginRight: '10px', cursor: "pointer" }} />
                    <input className='chat-message search-area' placeholder='Chat doctor...' onChange={(e) => { setMessage(e.target.value) }} type="text" />
                    <IoSend style={{ fontSize: '30px', marginRight: '10px', cursor: "pointer" }} onClick={sendMessage} />
                    <MdOutlineKeyboardVoice style={{ fontSize: '30px', marginRight: '10px', cursor: "pointer" }} />
                </div>
            </div>
            : 
            <h2 style={{margin:'50px auto'}}>Click on a Doctor's Profile to Start a Chat</h2>}
        </div>
    )
}

export default ChatFeatures;