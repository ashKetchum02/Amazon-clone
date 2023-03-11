import "./changepassword.css"
import Navbar from '../../components/navbar/Navbar';
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";

export default function ChangePassword() {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))

    const handleSave = async () => {
        const curPass = document.getElementById("curPass").value
        const newPass = document.getElementById("newPass").value
        const reNewPass = document.getElementById("reNewPass").value

        if (newPass !== reNewPass) {
            alert("New Password and Re-enter New Password don't match");
            navigate("/changePassword")
        }

        else {
            const res = await axios.put("/api/users/changePassword", {email: user.email, curPass: curPass, newPass: newPass})
            if (res.data.includes("changed")) {
                alert(res.data)
                navigate("/editInfo")
                return;
            }

            else {
                alert(res.data)
                navigate("/changePassword")
            }
        }
    }

    return (
        <>
            <>
            <Navbar />
            <SecondNavbar />
            <div className="changePasswordWrapper">
                <div className="changePasswordNav">
                    <Link to="/yourAccount">
                        <div style={{marginLeft: "10px", color: "#0066c0"}}>Your Account</div>
                    </Link>
                    <div style={{marginLeft: "10px"}}> {'>'} </div>
                    <Link to="/editInfo">
                        <div style={{marginLeft: "10px", color: "#0066c0"}}>Login & Security</div>
                    </Link>
                    <div style={{marginLeft: "10px"}}>{'>'}</div>
                    <div className="changePasswordNavLink">Change Password</div>
                </div>
                <div className="changePasswordTitleContainer">
                    Change Password
                </div>
                <div className="changePasswordBox">
                    <div className="changePasswordInfo">
                        Use the form below to change the password for your Amazon account
                    </div>
                    <div className="chnagePasswordCurrentPassword">
                        <div>Current Password:</div>
                        <input id="curPass" type="password" />
                    </div>

                    <div className="chnagePasswordNewPassword">
                        <div>New Password:</div>
                        <input id="newPass" type="password" />
                    </div>

                    <div className="chnagePasswordReenterNewPassword">
                        <div>Re-enter new Password:</div>
                        <input id="reNewPass" type="password" />
                    </div>

                    <button onClick={handleSave} className="saveChangesButton">Save Changes</button>

                    <div className="deviceStolen">
                        <div>Lost or stolen device? Unusual activity?</div>
                        <div><a href="">Secure your account</a> instead</div>
                    </div>
                </div>
            </div>
        </>
        </>
    )
}
