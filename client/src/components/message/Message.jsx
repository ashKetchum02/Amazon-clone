
import "./message.css"
import {format} from "timeago.js"

function Message(props) {
    return (
        <>
            <div className={props.own ? "message own" : "message notown"}>
                <div className="messageTop">
                    <img className="messageImg" src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/07/pokemon-ash-ketchum-1.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5" alt="" />
                    <p className="messageText">{props.message.text}</p>
                </div>

                <div className="messageBottom">
                    {format(props.message.createdAt)}
                </div>
            </div>
        </>
    )
}

export default Message