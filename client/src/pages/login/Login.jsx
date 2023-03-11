import "./login.css"
import ArrowRightOutlinedIcon from '@material-ui/icons/ArrowRightOutlined';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Login() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate("")

    const handleRedirect = () => {
        navigate("/register");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(e.target[0].value);
        
        if (e.target[0].id == "email") {
            setEmail(e.target[0].value);
        }

        else {
            try {
                const res = await axios.post("/api/users/login", {email: email, password: e.target[0].value})
                if ((typeof(res.data) != "object") && res.data.includes("Create an account")) {
                    alert(res.data);
                    navigate("/register")
                } else if ((typeof(res.data) != "object") && res.data.includes("Password is incorrect")) {
                    alert(res.data);
                } else if (res.data.email) {
                    localStorage.setItem("user", JSON.stringify(res.data))
                    alert("Login Success")
                    setTimeout(() => {
                        document.location.reload();
                    }, 200)
                }
            } catch(err) {
                alert(err)
            }
        }
    }

    useEffect(() => {
        // setPassword("")
    }, [email])

    return (
        <div className="wrapper">
            <div className="loginContainer">
                <div className="logoContainer">
                    <img src="https://thumbs.dreamstime.com/b/amazon-155631949.jpg" alt="amazon logo" className="logo" />
                    <p className="extension">.in</p>
                </div>

                <div className="formContainer">
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div className="title">Sign-In</div>
                        {email=="" ? "" : <p className="userEmail">{email} <a href="">Change</a></p>}
                        {email=="" ? <label htmlFor="email">Email or phone number</label> : <label htmlFor="password">Password</label>}
                        {email=="" ? <input default="" type="text" name="email" id="email"/> : <input type="password" name="password" id="password"/>}
                        {email=="" ? <button type="submit" className="submitButton">Continue</button> : <button type="submit" className="submitButton">Sign-in</button>}
                        {
                            email=="" ? <div className="privacyPolicy">
                                            By continuing, you agree to Amazon's <a>Conditions of Use</a> and <a>Privacy Notice</a>.
                                        </div> 
                        : 
                                        <div className="checkRememberMe">
                                            <input type="checkbox" name="rememberMe" value="true" />
                                            <p>Keep me signed in.</p>
                                            <a href="">Details</a>
                                            <ArrowDropDownIcon />
                                        </div>
                        }

                        {email=="" ? <div className="needHelp">
                            <ArrowRightOutlinedIcon /> 
                            <a>Need help?</a>
                        </div> : ""}
                    </form>
                    <div className="signUpContainer">
                        {email=="" ? <p className="newTo">New to Amazon?</p> : <p className="newTo">or</p>}
                        {email=="" ? <button onClick={handleRedirect} className="createAccountButton">Create your Amazon account</button> : <button className="createAccountButton">Get OTP on your phone</button>}
                    </div>
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

// style={email=="" ? {} : {height:"280px"}}