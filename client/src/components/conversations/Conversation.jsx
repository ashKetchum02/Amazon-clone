import axios from "axios";
import { useState, useEffect } from "react";
import "./conversation.css"

function Conversation(props) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const friendId = props.conversation.members.find(m => m !== props.currentUser._id)

        const getUser = async () => {
            const res = await axios.post("/api/users/getUser", {userId: friendId});
            setUser(res.data)
        }

        getUser()

    }, [])

    return (
        <>
            {user ? <div className="conversation">
                <p>{user.username}</p>
            </div> : ""}
        </>

    )
}

export default Conversation