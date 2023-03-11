import "./changename.css"
import Navbar from "../../components/navbar/Navbar"
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangeName() {

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
    const navigate = useNavigate()
    
    const handleSave = async () => {
        const newName = document.getElementById("newName");
        if (newName.value == "") {
            alert("Enter name")
        }

        else {
            localStorage.setItem("user", JSON.stringify({
                username: newName.value, 
                orderHistory: user.orderHistory,
                _id: user._id, 
                email: user.email, 
                phone: user.phone, 
                address: user.address
            }, getCircularReplacer()))
            alert("Username Changed")
            setTimeout(function() {
                navigate("/editInfo")
            }, 700)

            await axios.put("/api/users/changeName", {email: user.email, newName: newName.value})
        }
    }

    return (
        <>
            <Navbar />
            <SecondNavbar />
            <div className="changeNameWrapper">
                <div className="changeNameContainer">
                    <div className="changeMobileNav">
                        <Link to="/yourAccount">
                            <div style={{marginLeft: "10px", color: "#0066c0"}}>Your Account</div>
                        </Link>
                        <div style={{marginLeft: "10px"}}> {'>'} </div>
                        <Link to="/editInfo">
                            <div style={{marginLeft: "10px", color: "#0066c0"}}>Login & Security</div>
                        </Link>
                        <div style={{marginLeft: "10px"}}>{'>'}</div>
                        <div className="changeMobileNavLink">Change Name</div>
                    </div>
                    <div className="changeNameHeader">Change Your Name</div>
                    <div className="changeNameBox">
                        <div className="changeNameInfo">
                            If you want to change the name associated with your Amazon customer account, you may do so below. 
                            Be sure to click the <span style={{fontWeight: "650"}}>Save Changes</span> button when you are done.
                        </div>
                        <div className="changeNameInputContainer">
                            <div>New name</div>
                            <input id="newName" style={{display: "block", width: "25%"}} type="text" />
                            <button onClick={handleSave}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
