import "./changemobile.css";
import Navbar from '../../components/navbar/Navbar';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from "react-router-dom";
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";
import { useNavigate } from "react-router";
import axios from "axios";

export default function ChangeMobile() {

    const navigate = useNavigate()

    const handleCancel = () => {
        navigate("/editInfo")
    }

    const user = JSON.parse(localStorage.getItem("user"))

    const handleContinue = async () => {
        // console.log(document.getElementById("newPhone").value);
        localStorage.setItem("newPhone", document.getElementById("newPhone").value)
        try {
            const res = await axios.post("/api/users/sendOtp", {email: user.email, newPhone: document.getElementById("newPhone").value});
            if ((typeof(res.data) == "string") && res.data.includes("success")) {
                navigate("/changeMobileVerify")
            } else {
                alert(res.data)
            }
        } catch(err) {
            alert(err)
        }
    }

    return (
        <>
            <Navbar />
            <SecondNavbar />
            <div className="changeMobileWrapper">
                <div className="changeMobileNav">
                    <Link to="/yourAccount">
                        <div style={{marginLeft: "10px", color: "#0066c0"}}>Your Account</div>
                    </Link>
                    <div style={{marginLeft: "10px"}}> {'>'} </div>
                    <Link to="/editInfo">
                        <div style={{marginLeft: "10px", color: "#0066c0"}}>Login & Security</div>
                    </Link>
                    <div style={{marginLeft: "10px"}}>{'>'}</div>
                    <div className="changeMobileNavLink">Change Mobile Number</div>
                </div>
                <div className="changeMobileTitleContainer">
                    Change Mobile Number
                </div>
                <div className="changeMobileBox">
                    <div className="oldMobile">
                        <div className="oldMobileHeader">
                            Old mobile number: 
                        </div>
                        <div className="oldMobileNumber">
                            IN +91 {user.phone}
                        </div>
                    </div>

                    <div className="newMobile">
                        <div className="newMobileHeader">
                            Mobile number
                        </div>
                        <div className="newMobileInput">
                            <div>
                                <span className="countryDropDown">
                                    <div>IN +91</div>
                                    <div style={{display: "flex", flexDirection: "column"}}> 
                                        <div style={{height: "5px"}}><ArrowDropUpIcon style={{width: "20px", position: "relative", bottom: "5px"}} /></div> 
                                        <div style={{height: "5px"}}><ArrowDropDownIcon  style={{width: "20px", position: "relative", bottom: "3px"}} /></div>
                                    </div>
                                </span>
                            </div>
                            <div style={{marginLeft: "10%"}}>
                                <input style={{height: "34px", borderRadius: "5px"}} id="newPhone" type="text" />
                            </div>
                        </div>

                        <div className="changeMobileNotice">
                            By enrolling your mobile phone number, you consent to receiving automated security notifications via text message from Amazon. 
                            You can opt out by removing your mobile number on the Login & Security page located in Your Account settings. 
                            Message and data rates may apply.
                        </div>

                        <div className="changeMobileButtons">
                            <div><button onClick={handleContinue} className="changeMobileContinueButton"><span style={{opacity: "1", color: "black"}}>Continue</span></button></div>
                            <div><button onClick={handleCancel} className="changeMobileCancelButton"><span style={{opacity: "1", color: "black"}}>Cancel</span></button></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
