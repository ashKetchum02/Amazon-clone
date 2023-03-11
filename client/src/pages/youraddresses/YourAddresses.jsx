import Navbar from "../../components/navbar/Navbar"
import SecondNavbar from "../../components/secondnavbar/SecondNavbar"
import "./youraddressses.css"
import { Link } from "react-router-dom";
import ProductFooter from "../../components/productfooter/ProductFooter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function YourAddresses() {
    
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    var temp = localStorage.getItem("products")
    const [cartNumber, setCartNumber] = useState(temp ? parseInt(JSON.parse(temp).length) : 0);

    useEffect(() => {

    }, [cartNumber])

    const handleAdd = (e) => {

        e.preventDefault();

        var cartProducts = JSON.parse(localStorage.getItem("products"));

        if (!cartProducts) {
            localStorage.setItem("products", JSON.stringify([]));
            cartProducts = JSON.parse(localStorage.getItem("products"));
            cartProducts.push({productImage: e.target[5].value, productName: e.target[0].value, productPrice: e.target[1].value, productId: e.target[2].value, productReviews: e.target[3].value, productRating: e.target[4].value});
            localStorage.setItem('products', JSON.stringify(cartProducts));
        }

        else {
            cartProducts.push({productImage: e.target[5].value, productName: e.target[0].value, productPrice: e.target[1].value, productId: e.target[2].value, productReviews: e.target[3].value, productRating: e.target[4].value});
            localStorage.setItem('products', JSON.stringify(cartProducts));
        }
        setCartNumber(cartNumber + 1);
    };

    const handleEditAddress = (e) => {
        const index = parseInt(e.target.parentElement.parentElement.id);
        const edit = user.address[index]
        edit.index = index;
        localStorage.setItem("edit", JSON.stringify(edit));
        navigate("/editAddress")
    };

    const handleRemoveAddress = async (e) => {
        const index = parseInt(e.target.parentElement.parentElement.id);
        if (user.address[index].default == 1) {
            alert("Make another address as default and then try deleting this one");
            return;
        } else {
            user.address.splice(index, 1);
            localStorage.setItem("user", JSON.stringify(user));
            try {
                const res = await axios.put("http://localhost:8000/users/editAddress", {email: user.email, newAddressArray: user.address});
                if (res.data.includes("success")) {
                    alert("Address deleted");
                    document.location.reload()
                }
            } catch(err) {
                console.log(err);
            }
            document.location.reload();
        }
    }

    return (
        <>
            <Navbar />
            <SecondNavbar />

            <div className="yourAddressesWrapper">
                <div className="yourAddressesBox">
                    <div className="changeMobileNav">
                        <Link to="/yourAccount">
                            <div style={{marginLeft: "10px", color: "#0066c0"}}>Your Account</div>
                        </Link>
                        <div style={{marginLeft: "10px"}}> {'>'} </div>
                        <div className="changeMobileNavLink">Your Addresses</div>
                    </div>
                    <div className="yourAddressesTitle">
                        Your Addresses
                    </div>

                    <div className="yourAddressesContainer">
                        <Link className="increaseWidth" to="/addAddress" style={{textDecoration: "none", color: "darkgray", width: "min-content"}}>
                            <div className="newAddress">
                                <div style={{fontSize: "70px", color:"darkgray"}}>+</div>
                                <div style={{fontSize: "24px", color: "black"}}>Add a new Address</div>
                            </div>
                        </Link>

                        {user.address.map((a, index) => {
                            return (
                                <form className="oneAddress" id={index}>
                                    <div style={a.default == 1 ? {borderBottom: "1px solid gray", fontSize: "13px", color: "gray"} : {display: "none"}}>Default</div>
                                    <div className="addressInfo">
                                        <div style={{fontWeight: 700}}>{a.name}</div>
                                        <div>{a.flat}</div>
                                        <div>{a.street}</div>
                                        <div>{a.city.toUpperCase()}, {a.state.toUpperCase()}, {a.pincode}</div>
                                        <div>{a.country.toUpperCase()}</div>
                                        <div>Phone number: {a.phone}</div>
                                        <div style={{marginTop: "10px"}}><a href="">Add delivery instructions</a></div>
                                    </div>

                                    <div className="addressButtons">
                                        <a onClick={handleEditAddress}>Edit</a>
                                        <a onClick={handleRemoveAddress}>Remove</a>
                                    </div>
                                </form>
                            )
                        })}

                    </div>
                </div>
            </div>
            <div className="footer">

                    <div className="alsoBuyContainer">
                        <p className="title">Recommended based on your shopping trends</p>
                        <div className="alsoBuyProductContainer">
                        
                            <form onSubmit={handleAdd}><ProductFooter key={1} id={"1"} reviews="178" rating="4" price="2,49,990" name="Dell Alienware x15 R1 (2021) Intel i7-11800H 15.6 inches FHD Gaming Laptop, (32GB, 1TB SSD, NVIDIA RTX 3070 8GB, Windows 11, MSO 21, 300 nits 360Hz, Alien FX, Lunar Light, D569933WIN9" image="https://images-eu.ssl-images-amazon.com/images/I/61J%2B%2B6x4ezL._AC_UL405_SR405,405_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={2} id={"2"} reviews="17,829" rating="5" price="1,879" name="Apple 20W USB-C Power Adapter (for iPhone, iPad & AirPods)" image="https://images-eu.ssl-images-amazon.com/images/I/61vtLhO6fDL._AC_UL320_SR320,320_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={3} id={"3"} reviews="92,829" rating="3.5" price="19,990" name="Redmi Note 11 Pro + 5G (Mirage Blue, 6GB RAM, 128GB Storage) | 67W Turbo Charge | 120Hz Super AMOLED Display | Additional Exchange Offers | Charger Included| Get 2 Months of YouTube Premium Free!" image="https://images-eu.ssl-images-amazon.com/images/I/71UDT0TuNDL._AC_UL405_SR405,405_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={4} id={"4"} reviews="178" rating="3.5" price="33,490" name="Google Pixel 4XL - Clearly White" image="https://images-eu.ssl-images-amazon.com/images/I/71oTy+incwL._AC_UL320_SR320,320_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={5} id={"5"} reviews="178" rating="2.5" price="18,999" name="OnePlus Nord CE 2 Lite 5G" image="https://images-eu.ssl-images-amazon.com/images/I/71AvQd3VzqL._AC_UL320_SR320,320_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={6} id={"6"} reviews="178" rating="3.5" price="51,990" name="Apple Watch Series 7 (GPS + Cellular, 45mm) - Blue Aluminium Case with Abyss Blue Sport Band - Regular" image="https://m.media-amazon.com/images/I/71SFsTBSJgL._AC_UY436_QL65_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={7} id={"7"} reviews="178" rating="3.5" price="19,990" name="Redmi Note 11 Pro + 5G (Stealth Black, 6GB RAM, 128GB Storage) | 67W Turbo Charge | 120Hz Super AMOLED Display | Additional Exchange Offers | Charger Included| Get 2 Months of YouTube Premium Free!" image="https://images-eu.ssl-images-amazon.com/images/I/71lx0qz7rFL._AC_UL405_SR405,405_.jpg"/> </form>
                        </div>
                    </div>

                    <div className="alsoBuyContainer inspired">
                        <p className="title">Inspired by your browsing history</p>
                        <div className="alsoBuyProductContainer">
                        <form onSubmit={handleAdd}><ProductFooter key={11} id={"11"} reviews="1,899" rating="4" price="2,300" name="PS5 Grand Theft Auto V" image="https://m.media-amazon.com/images/I/81kAitW5qAL._AC_UY436_QL65_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={12} id={"12"} reviews="17,829" rating="4.5" price="33,999" name="Xbox Series 5" image="https://m.media-amazon.com/images/I/71NBQ2a52CL._AC_UY436_QL65_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={13} id={"13"} reviews="829" rating="3.5" price="3,990" name="Microsoft Xbox Series X/S Wireless Controller Carbon Black" image="https://m.media-amazon.com/images/I/712Kf43qj4L._AC_UY436_QL65_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={14} id={"14"} reviews="5,867" rating="3" price="2,149" name="All-new Echo Dot (4th Gen, Blue) combo with Wipro 9W LED smart color bulb" image="https://m.media-amazon.com/images/I/616EjvhXsDS._AC_UY436_QL65_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={15} id={"15"} reviews="9,998" rating="4" price="19,999" name="Sony WH-1000XM4 Industry Leading Wireless Noise Cancellation Bluetooth Headphones with Mic, 30 Hrs Battery, Multi Point, AUX - Black | Instant Bank Discount of INR 2000 on Select Prepaid transactions" image="https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UY436_QL65_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={2} id={"2"} reviews="17,829" rating="5" price="1,879" name="Apple 20W USB-C Power Adapter (for iPhone, iPad & AirPods)" image="https://images-eu.ssl-images-amazon.com/images/I/61vtLhO6fDL._AC_UL320_SR320,320_.jpg"/></form>
                            <form onSubmit={handleAdd}><ProductFooter key={16} id={"16"} reviews="9,998" rating="4" price="19,990" name="Sony WH-1000XM4 Industry Leading Wireless Noise Cancellation Bluetooth Headphones with Mic, 30 Hrs Battery, Multi Point, AUX - Black | Instant Bank Discount of INR 2000 on Select Prepaid transactions" image="https://m.media-amazon.com/images/I/71a5XAAbzbL._AC_SR360,240_QL70_.jpg"/> </form>
                        </div>
                    </div>

                </div>
        </>
    )
}
