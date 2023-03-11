import Navbar from "../../components/navbar/Navbar"
import SecondNavbar from "../../components/secondnavbar/SecondNavbar"
import "./changemobileverify.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function ChangeMobileVerify() {

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

    const user = JSON.parse(localStorage.getItem("user"))
    const newPhone = localStorage.getItem("newPhone")
    const navigate = useNavigate()

    const handleVerify = async () => {
        const otp = document.getElementById("otp").value
        console.log(user);
        try {
            const res = await axios.post("/api/users/verifyMobileOtp", {email: user.email, newPhone: newPhone, otp: otp})
            if (res.data.includes("success")) {
                alert("Mobile Number Changed")
                localStorage.setItem("user", JSON.stringify({
                    username: user.username, 
                    orderHistory: user.orderHistory,
                    _id: user._id, 
                    email: user.email, 
                    phone: newPhone, 
                    address: user.address
                }, getCircularReplacer()))
                localStorage.removeItem("newPhone")
                setTimeout(() => {
                    localStorage.removeItem("newPhone")
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

    const hanldeResend = async () => {
        await axios.post("/api/users/sendOtp", {email: user.email, newPhone: localStorage.getItem("newPhone")});
        alert("OTP sent")
        navigate("/changeMobileVerify");
    }

    const handleChange = () => {
        localStorage.removeItem("newPhone")
        navigate("/changeMobile")
    }

    return (
        <>
            <Navbar />
            <SecondNavbar />

            <div className="changeMobileVerifyWrapper">
                <div className="changeMobileVerifyBox" style={{width: "30%"}}>
                    <div className="changeMobileVerifyHeader">
                        Verify mobile number
                    </div>
                    <div className="changeMobileVerifyInfo">
                        A text with a One Time Password (OTP) has been sent to your mobile number: <span style={{fontWeight: "700"}}>{newPhone}</span> <span onClick={handleChange}>Change</span>
                    </div>
                    <div className="changeMobileVerifyInputContainer">
                        <div><span style={{fontWeight: "650"}}>Enter OTP:</span> <span onClick={hanldeResend} style={{position: "absolute", cursor: "pointer", color: "#0066c0", right: "36%"}}>Resend OTP</span></div>
                        <input id="otp" type="text" />
                        <button onClick={handleVerify}>Verify</button>
                    </div>
                </div>
            </div>
        </>
    )
}
