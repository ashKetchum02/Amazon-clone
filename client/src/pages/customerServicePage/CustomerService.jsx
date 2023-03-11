
import "./customerservice.css"
import Navbar from "../../components/navbar/Navbar";
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";
import { Link } from "react-router-dom";

function CustomerService() {
    return (
        <>
            <Navbar />
            <SecondNavbar />
            <div className="customerServiceWrapper">
                <header>How would you like to get help?</header>
                <div className="customerServiceOptions">
                    <div className="customerServiceCall">
                        <h2>Request a phone call</h2>
                        <button>Request a phone call now</button>
                    </div>
                    <div className="customerServiceChat">
                        <h2>Chat with us</h2>
                        <p>Start a new chat with a customer service representative or continue the previous chat</p>
                        <div>
                            <p>Why chat</p>
                            <ul>
                                <li>Chat at your own pace. Once you start a chat, you have 24 hours to come and go as you like</li>
                                <li>Our customer service representatives will quickly figure out the problem</li>
                            </ul>
                        </div>
                        <Link to={"/chat"} style={{textDecoration: "none", color: "rgb(202, 195, 195)"}}>
                            <button>Chat with us now</button>
                        </Link>
                    </div>
                    <div className="customerServiceVideoCall">
                        <h2>Video chat with us</h2>
                        <p>This feature is only for people with hearing-disability</p>
                        <p>A customer service representative who is well-versed with sign language will be with you</p>
                        <Link to={"/videoCall"} style={{textDecoration: "none", color: "rgb(202, 195, 195)"}}>
                            <button>Redirect to video call</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerService;