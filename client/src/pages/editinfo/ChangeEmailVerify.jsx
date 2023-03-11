import "./chnageemailverify.css";
import Navbar from "../../components/navbar/Navbar";
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios"

export default function ChangeEmailVerify() {

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };

    const newEmail = localStorage.getItem("newEmail");
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const handleVerify = async () => {
        const otp = document.getElementById("otp").value
        console.log("hello");
        try {
            const res = await axios.post("/api/users/verifyEmailOtp", {email: user.email, newEmail: newEmail, otp: otp})
            if (res.data.includes("success")) {
                alert(res.data);
                localStorage.setItem("user", JSON.stringify({
                    username: user.username, 
                    orderHistory: user.orderHistory,
                    _id: user._id, 
                    email: newEmail, 
                    phone: user.phone, 
                    address: user.address
                }, getCircularReplacer()))
                localStorage.removeItem("newEmail");
                setTimeout(() => {
                    navigate("/editInfo")
                }, 300)
            }

            else {
                alert(res.data)
            }

        } catch(err) {
            console.log(err);
        }
    }

    const handleResend = async () => {
        await axios.post("/api/users/sendEmailOtp", {email: user.email, newEmail: newEmail});
        alert("OTP sent")
        navigate("/changeEmailVerify")
    }

    const handleChange = () => {
        localStorage.removeItem("newEmail");
        navigate("/changeEmail")
    }

    return (
        <>
            <Navbar />
            <SecondNavbar />
            <div className="changeMobileVerifyWrapper">
                <div className="changeEmailVerifyBox">
                    <div className="changeMobileVerifyHeader">
                        Verify email
                    </div>
                    <div className="changeMobileVerifyInfo">
                        A text with a One Time Password (OTP) has been sent to your new email: <span style={{fontWeight: "700"}}>{newEmail}</span> <span className="change" onClick={handleChange}>Change</span>
                    </div>
                    <div className="changeMobileVerifyInputContainer">
                        <div><span style={{fontWeight: "650"}}>Enter OTP:</span> <span onClick={handleResend} style={{position: "absolute", cursor: "pointer", color: "#0066c0", right: "36%"}}>Resend OTP</span></div>
                        <input id="otp" type="text" />
                        <button onClick={handleVerify}>Verify</button>
                    </div>
                </div>
            </div>
        </>
    )
}
