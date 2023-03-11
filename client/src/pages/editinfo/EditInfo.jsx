import "./editinfo.css"
import Navbar from "../../components/navbar/Navbar"
import { useRef } from "react";
import axios from "axios";
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function EditInfo() {

    const user = JSON.parse(localStorage.getItem("user"))

    const navigate = useNavigate()

    const email = useRef();
    const name = useRef();
    const phone = useRef();
    const password = useRef();

    const handleSave = async () => {
        await axios.put("http://localhost:8000/users/editInfo", {email: email.current.value, name: name.current.value, phone: phone.current.value, password: password.current.value})
    }

    const handleDone = () => {
        navigate("/yourAccount")
    }

    return (
        <>
            <Navbar />
            <SecondNavbar />
            <div className="editInfoWrapper">
                <div className="editInfoContainer">
                    <div className="editInfoHeader">Login & Security</div>
                    <div className="editInfoBox">
                        <div className="editInfoOption">
                            <div className="editInfoOptionHeader">
                                <div className="editInfoOptionHeaderLine1">Name:</div>
                                <div className="editInfoOptionHeaderLine2">{user.username}</div>
                            </div>
                            <Link to="/changeName" style={{textDecoration: "none", color: "black"}}>
                                <div className="editInfoOptionButtonContainer">
                                    <button>Edit</button>
                                </div>
                            </Link>
                        </div>

                        <hr className="editInfoHr" />

                        <div className="editInfoOption">
                            <div className="editInfoOptionHeader">
                                <div className="editInfoOptionHeaderLine1">Mobile Phone Number:</div>
                                <div className="editInfoOptionHeaderLine2">{user.phone}</div>
                            </div>
                            <Link to="/changeMobile" style={{textDecoration: "none", color: "black"}}>
                                <div className="editInfoOptionButtonContainer">
                                    <button>Edit</button>
                                </div>
                            </Link>
                        </div>

                        <hr className="editInfoHr" />

                        <div className="editInfoOption">
                            <div className="editInfoOptionHeader">
                                <div className="editInfoOptionHeaderLine1">Email:</div>
                                <div className="editInfoOptionHeaderLine2">{user.email}</div>
                            </div>
                            <Link to="/changeEmail" style={{textDecoration: "none", color: "black"}}>
                                <div className="editInfoOptionButtonContainer">
                                    <button>Edit</button>
                                </div>
                            </Link>
                        </div>

                        <hr className="editInfoHr" />

                        <div className="editInfoOption">
                            <div className="editInfoOptionHeader">
                                <div className="editInfoOptionHeaderLine1">Password:</div>
                                <div className="editInfoOptionHeaderLine2">***********</div>
                            </div>
                            <Link to="/changePassword" style={{textDecoration: "none", color: "black"}}>
                                <div className="editInfoOptionButtonContainer">
                                    <button>Edit</button>
                                </div>
                            </Link>
                        </div>

                        <hr className="editInfoHr" />

                        <div className="editInfoOption" style={{flexDirection: "column"}}>
                            <div className="editInfoOptionHeaderLine1">
                                Two-Step Verification (2SV) Settings:
                            </div>
                            <div className="editInfoOptionHeaderLine2" style={{color: "rgb(85, 83, 83)"}}>
                                Manage your Two Step Verification (2SV) Authenticators
                            </div>
                            <div className="editInfoOptionButtonContainer">
                                <button className="bottomButton">Edit</button>
                            </div>
                        </div>

                        <hr className="editInfoHr" />

                        <div className="editInfoOption" style={{flexDirection: "column"}}>
                            <div className="editInfoOptionHeaderLine1">
                                Secure Your Account:
                            </div>
                            <div className="editInfoOptionHeaderLine2"  style={{color: "rgb(85, 83, 83)"}}>
                                If you think your Amazon account has been compromised, follow these steps to make your account more secure.
                            </div>
                            <div className="editInfoOptionButtonContainer">
                                <button>Edit</button>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="doneButtonContainer">
                    <button onClick={handleDone}>Done</button>
                </div>

            </div>
        </>
    )
}
