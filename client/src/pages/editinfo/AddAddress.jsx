import Navbar from "../../components/navbar/Navbar"
import SecondNavbar from "../../components/secondnavbar/SecondNavbar"
import "./addaddress.css"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"

export default function AddAddress() {

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate()

    const handleAdd = async (e) => {
        e.preventDefault();
        const country = document.getElementById("country").value;
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const pincode = document.getElementById("pincode").value;
        const flat = document.getElementById("flat").value;
        const street = document.getElementById("street").value;
        const landmark = document.getElementById("landmark").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const addressType = document.getElementById("addressType").value;

        const defaultAddress = document.getElementById('makeDefault').checked;

        const newAddress = {
            country: country,
            name: name,
            phone: phone,
            pincode: pincode,
            flat: flat,
            street: street,
            landmark: landmark,
            city: city,
            state: state,
            addressType: addressType,
            default: defaultAddress ? 1 : 0
        };

        try {
            const res = await axios.post("/api/users/addAddress", {email: user.email, newAddress: newAddress});

            if (res.data.includes("success")) {
                if (newAddress.default == 1) {
                    user.address.map((a) => {
                        a.default = 0;
                    })
                }
                user.address.push(newAddress)
                localStorage.setItem("user",JSON.stringify(user))
                navigate("/yourAddresses")
            }

            else {
                alert(res.data)
                navigate("/yourAddresses")
            }

        } catch(err) {
            console.log(err);
        }

    }

    return (
        <>
            <Navbar />
            <SecondNavbar />
            <div className="addAddressWrapper">
                <div className="addAddressBox">
                    <div className="changeMobileNav">
                        <Link to="/yourAccount">
                            <div style={{marginLeft: "10px", color: "#0066c0"}}>Your Account</div>
                        </Link>
                        <div style={{marginLeft: "10px"}}> {'>'} </div>
                        <Link to="/editInfo">
                            <div style={{marginLeft: "10px", color: "#0066c0"}}>Your Addresses</div>
                        </Link>
                        <div style={{marginLeft: "10px"}}>{'>'}</div>
                        <div className="changeMobileNavLink">Add Address</div>
                    </div>
                    <div className="addAddressTitle">
                        Add a new address
                    </div>
                    
                    <div className="amazonPickUpLoc">
                        <img style={{display:"inline-block"}} src="https://d161vkckch5xxj.cloudfront.net/LS/ASSETS/Images/amazon_hub_pin.svg" alt="" />
                        <a style={{fontSize: "13px", position:"relative", bottom: "10px", left: "5px"}}>Or find an Amazon pickup location near you {'>'}</a>
                    </div>
                    <div className="autofillLoc">
                        Save time. Autofill your current location.
                        <button style={{position: "relative", left: "20%"}}>Autofill</button>
                    </div>

                    <form onSubmit={handleAdd}>
                        <div className="addAddressCountry">
                            <div>Country/Region</div>
                            <select name="country" id="country">
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                            </select>
                        </div>

                        <div className="addAddressFullName">
                            <div>Full Name</div>
                            <input required type="text" id="name" />
                        </div>

                        <div className="addAddressFullName">
                            <div>Mobile Number</div>
                            <input required type="text" id="phone" />
                        </div>

                        <div className="addAddressFullName">
                            <div>Pincode</div>
                            <input required type="text" placeholder={"6 digits [0-9] PIN code"} id="pincode" />
                        </div>

                        <div className="addAddressFullName">
                            <div>Flat, House no., Building, Company, Apartment</div>
                            <input required type="text" id="flat" />
                        </div>

                        <div className="addAddressFullName">
                            <div>Area, Street, Sector, Village</div>
                            <input required type="text" id="street" />
                        </div>

                        <div className="addAddressFullName">
                            <div>Landmark</div>
                            <input required type="text" placeholder={"E.g. near state bank of india"} id="landmark" />
                        </div>

                        <div className="addAddressFullName" style={{display: "grid", gridTemplateColumns: "0.9fr 0.2fr 0.9fr"}}>
                            <div>
                                <div>Town/City</div>
                                <input required type="text" id="city" />
                            </div>
                            <div></div>
                            <div>
                                <div>State</div>
                                <input required type="text" id="state" />
                            </div>
                        </div>

                        <div className="make">
                            <input style={{width: "30px"}} type="checkbox" name="makeDefault" id="makeDefault" /> <span style={{position: "relative", bottom: "8px", right: "10px"}}>Make this my default address</span>
                        </div>

                        <div className="deliveryInstructions">
                            <div>Add delivery instructions</div>
                            <div>Preferences are used to plan your delivery. 
                                However, shipments can sometimes arrive early or later than planned.
                            </div>
                        </div>

                        <div className="addressType">
                            <div>Address Type</div>
                            <select name="addressType" id="addressType">
                                <option value="Select an address type" selected={true}>Select an address type</option>
                                <option value="Home [7 am - 9 pm delivery]">Home [7 am - 9 pm delivery]</option>
                                <option value="Office/Commercial [10 am - 6 pm delivery]">Office/Commercial [10 am - 6 pm delivery]</option>
                            </select>
                        </div>
                        <button type="submit" className="addAddressButton">Add Address</button>
                    </form>
                </div>
            </div>
        </>
    )
}
