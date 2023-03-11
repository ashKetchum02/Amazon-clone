import "./register.css"
import { useNavigate } from "react-router";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useState } from "react";

export default function Register() {

    const navigate = useNavigate();

    const email = useRef("")
    const phone = useRef("")
    const password = useRef("")
    const name = useRef("")
    const [otp, setOtp] = useState(0);

    useEffect(() => {

    }, [otp])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await axios.post("/api/users/sendRegisterOtp", 
                                                                    {email: email.current.value})
            if (res.data.includes("success")) {
                alert(res.data);
                setOtp(1);
            }
            else {
                alert(res.data);
            }
        } catch(err) {
            alert(err);
        }
    };

    const handleResend = async () => {
        await axios.post("/api/users/sendRegisterOtp", {email: email, newEmail: email});
        alert("OTP sent")
    };

    const handleChange = () => {
        navigate("/register")
    };

    const handleVerify = async () => {
        const otp = document.getElementById("otp").value
        // console.log("hello");
        try {
            const res = await axios.post("/api/users/register", {email: email.current.value, username: name.current.value, otp: otp, phone: phone.current.value, password: password.current.value})
            if (res.data.includes("success")) {
                alert(res.data);
                setTimeout(() => {
                    navigate("/login")
                }, 300)
            } else {
                alert(res.data)
            }

        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="wrapper">
            <div className="registerContainer">
                <div className="logoContainer">
                    <img src="https://thumbs.dreamstime.com/b/amazon-155631949.jpg" alt="amazon logo" className="logo" />
                    <p className="extension">.in</p>
                </div>

                <div className="verifyFormContainer" style={otp == 0 ? {display: "none"} : {}}>
                    <div className="changeMobileVerifyWrapper">
                        <div className="changeMobileVerifyBox">
                            <div className="changeMobileVerifyHeader">
                                Verify email
                            </div>
                            <div className="changeMobileVerifyInfo">
                                A text with a One Time Password (OTP) has been sent to your new email: <span style={{fontWeight: "700"}}>{email.current.value}</span> <span className="change" onClick={handleChange}>Change</span>
                            </div>
                            <div className="changeMobileVerifyInputContainer">
                                <div><span style={{fontWeight: "650"}}>Enter OTP:</span> <span onClick={handleResend} style={{position: "absolute", cursor: "pointer", color: "#0066c0", right: "36%"}}>Resend OTP</span></div>
                                <input id="otp" type="text" required />
                                <button onClick={handleVerify}>Verify</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="formContainer" style={otp == 0 ? {} : {display: "none"}}>
                    <form className="registerForm" onSubmit={handleSubmit}>
                        <div className="title">Create Account</div>
                        <div className="formDiv">
                            <label htmlFor="name">Your name</label>
                            <input ref={name} required placeholder="First and last name" type="text" name="name" id="name"/>
                        </div>
                        <div className="formDiv">
                            <label htmlFor="phone">Mobile number (Optional)</label>
                            <div style={{display: "flex"}}>
                                <div style={{marginRight: "15px"}}>
                                    <span className="countryDropDown">
                                        <div>IN +91</div>
                                        <div style={{display: "flex", flexDirection: "column"}}> 
                                            <div style={{height: "5px"}}><ArrowDropUpIcon style={{width: "20px", position: "relative", bottom: "5px"}} /></div> 
                                            <div style={{height: "5px"}}><ArrowDropDownIcon  style={{width: "20px", position: "relative", bottom: "3px"}} /></div>
                                        </div>
                                    </span>
                                </div>
                                <div><input ref={phone} placeholder="Mobile number" type="text" name="phone" id="phone"/></div>
                            </div>
                        </div>
                        <div className="formDiv">
                            <label htmlFor="email">Email</label>
                            <input ref={email} type="email" name="email" id="email" default="" required/>
                        </div>
                        <div className="formDiv">
                            <label htmlFor="password">Password</label>
                            <input ref={password} type="password" name="password" id="password" min="6" placeholder="At least 6 characters" required/>
                        </div>

                        <div className="registerFormInfo">
                            We will send you a text to verify your email.
                            Message and Data rates may apply.   
                        </div>

                        <button type="submit" className="submitButton">Continue</button>

                        <hr />

                        <div className="extraLinks">
                            <div>Already have an account? <Link to="/login">Sign-in</Link> </div>
                            <div>Buying for work? <Link to="/">Create a free business account</Link></div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="footer">
                <ul className="footerLinks">
                    <li><a href="">Conditions of use</a></li>
                    <li><a href="">Privacy Notice</a></li>
                    <li><a href="">Help</a></li>
                </ul>
                <div className="copyright">© 1996-2022, Amazon.com, Inc. or its affiliates</div>
            </div>
        </div>
    );
}