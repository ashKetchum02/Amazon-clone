import "./changeemail.css"
import Navbar from '../../components/navbar/Navbar';
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";

export default function ChangeEmail() {

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();

    const handleClick = async () => {
        const newEmail = document.getElementById("newEmail").value;
        if(newEmail == "") {
            alert("Enter an email");
            return;
        }
        localStorage.setItem("newEmail", newEmail);
        try {
            // alert(user.email);
            const res = await axios.post("/api/users/sendEmailOtp", {email: user.email, newEmail: newEmail})
            if (res.data.includes("success")) {
                alert(res.data);
                navigate("/changeEmailVerify");
            }
            else {
                alert(res.data);
                navigate("/editInfo");
            }
        } catch(err) {
            console.log(err);
        }
    }
    
    return (
        <>
            <Navbar />
            <SecondNavbar />
            <div className="changeEmailWrapper">
                <div className="changeMobileNav">
                    <Link to="/yourAccount">
                        <div style={{marginLeft: "10px", color: "#0066c0"}}>Your Account</div>
                    </Link>
                    <div style={{marginLeft: "10px"}}> {'>'} </div>
                    <Link to="/editInfo">
                        <div style={{marginLeft: "10px", color: "#0066c0"}}>Login & Security</div>
                    </Link>
                    <div style={{marginLeft: "10px"}}>{'>'}</div>
                    <div className="changeMobileNavLink">Change Email Address</div>
                </div>
                <div className="changeEmailBox">
                    <div className="changeEmailHeader">
                        Add an email address
                    </div>
                    <div className="changeEmailInfo">
                        Enter the new email address you would like to associate with your account below. 
                        We will send a One Time Password (OTP) to that address.
                    </div>
                    <div className="changeEmailInputContainer">
                        <div>New email address</div>
                        <input id="newEmail" type="email" required />
                        <button onClick={handleClick}>Continue</button>
                    </div>
                </div>
            </div>
        </>
    )
}
