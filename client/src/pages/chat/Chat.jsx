
import React, { useRef, useState, useContext, useEffect } from 'react'
import Conversation from '../../components/conversations/Conversation';
import "./chat.css"
import Message from '../../components/message/Message';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import {io} from "socket.io-client"
import Navbar from "../../components/navbar/Navbar";
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";

function Chat() {

    const [conversations, setConversations] = useState(null);

    const [currentChat, setCurrentChat] = useState(null);

    const [messages, setMessages] = useState(null);

    const [newMessage, setNewMessage] = useState("");

    const socket = useRef()

    const scrollRef = useRef();

    const user = JSON.parse(localStorage.getItem("user"))

    const [arrivalMessage, setArrivalMessage] = useState("")

    const [onlineExecutives, setOnlineExecutives] = useState(null)

    const handleChangeCurrentChat = (conversation) => {
        setCurrentChat(conversation)
    }

    const handleNewConversation = async (e) => {

        try {
            const free = await onlineExecutives.length == 0 ? null : onlineExecutives[Math.floor(Math.random() * onlineExecutives.length)]
            if (free) {
                const res = await axios.post("/api/conversations/", {senderId: user._id, receiverId: free.userId})
                setCurrentChat(res.data)
                socket.current.emit("sendNewConversation", {receiverId: free.userId, conversation: res.data});

                const convoRes = await axios.get("/api/conversations/" + user._id);
                setConversations(convoRes.data)
            }
            if (!free) {
                alert("No customer service executives free right now. Please try again later")
                console.log(free)
            }
        } catch(err) {
            console.log(err)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };

        const receiverId = await currentChat.members.find(member => member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })

        const res = await axios.post("/api/messages/", message);
        setMessages([...messages, res.data]);
        setNewMessage("")
    }

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
            // alert("hi")
        })

        socket.current.on("newConversation", conversation => {
            setCurrentChat(conversation)
            const getConversations = async () => {
                const res = await axios.get("/api/conversations/" + user._id);
                
                setConversations(res.data)
            }
    
            getConversations()
        })

        socket.current.on("getExecutives", users => {
            setOnlineExecutives(users)
        })
        if (!user.executive || user.executive == "0")
            socket.current.emit("addUser", user._id);
        else 
            socket.current.emit("addExecutive", user._id);
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
        setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        const getConversations = async () => {
            const res = await axios.get("/api/conversations/" + user._id);
            
            setConversations(res.data)
        }

        getConversations()
    }, [user._id])

    useEffect(() => {
        const getMessages = async () => {
            if (currentChat) {
                const res = await axios.get("/api/messages/" + currentChat?._id)
                setMessages(res.data)
            }
            // console.log(res.data)
        }

        getMessages();
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

    return (
        <> 
            <Navbar />
            <SecondNavbar />
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        {conversations != null ? conversations.map((conversation) => {
                            return (
                                <div onClick={() => handleChangeCurrentChat(conversation)}>
                                    <Conversation conversation={conversation} currentUser={user} />
                                </div>
                            )
                        }) : ""}
                    </div>
                </div>

                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        {currentChat ? <>
                        <div className='chatBoxTop'>
                            {messages ? 
                                messages.map(message => {
                                    return (
                                        <div ref={scrollRef}>
                                            <Message message={message} own={message.sender == user._id} />
                                        </div>
                                    )
                                })
                            : "You haven't spoken in this chat yet"}
                        </div>
                        <div className='chatBoxBottom'>
                            <textarea onChange={(e) => {setNewMessage(e.target.value)}} value={newMessage} className='chatMessageInput' placeholder='send a message'></textarea>
                            <button onClick={handleSubmit} className='chatSubmitButton'>Send</button>
                        </div> </> 
                        : <> {!user.executive ? 
                                    <div><p className='noConversationText'>Open a previous conversation to chat 
                                    or start a new conversation</p> 
                                    <button className='newConversationButton' onClick={handleNewConversation}>New</button></div> 
                                    : <div> <p>Wait for a customer to be connected to you...</p>

                                </div> }</>}
                    </div> 
                </div>
            </div>
        </>
    )
}

export default Chat;