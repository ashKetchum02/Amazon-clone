import "./navbar.css"
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import { useState, useEffect } from "react";
import { useRef } from "react";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import MenuIcon from '@material-ui/icons/Menu';

export default function Navbar() {

    var products = JSON.parse(localStorage.getItem("products"))
    var cartNumber = products ? products.length : 0;

    const { user } = useContext(AuthContext);

    const [active, setActive] = useState(0);

    const clicked = () => {
        setActive(!active)
    }

    // const activateDropDown = () => {
    //     const eles = document.getElementsByClassName("drop");

    //     document.getElementById("navContainer").classList.toggle("blockDisplay");
    // }

    return (
        <div id="navContainer" className={active == 0 ? "navContainer":"navContainer blockDisplay"}>
            <Link to="/" style={{textDecoration: "none", color:"white"}}>
                <div className="logoContainer">
                    <img className="logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
                    <span>.in</span>
                </div>
            </Link>

            {active == 0 ? <div onClick={clicked} className="hamburger"><MenuIcon /></div> : <div onClick={clicked} className="hamburger"><CloseIcon /></div>}
            
            <Link to="/yourAddresses" style={{textDecoration: "none", color: "white"}}>
                <div className={active == 0 ? "helloSelectYourAddress drop":"helloSelectYourAddress"}>
                    <RoomOutlinedIcon className="locationIcon" />
                    <div className="text">
                        <span className="headerOptionLineOne">Hello</span>
                        <span className="headerOptionLineTwo">Select your address</span>
                    </div>
                </div>
            </Link>

            <div className={active == 0 ? "searchContainer drop":"searchContainer"}>
                <div className="dropDown">
                    <button className="dropDownButton">All <ArrowDropDownIcon /> </button>          
                </div>
                <input type="text" className="searchInput" />
                <button className="searchButton"><SearchIcon className="searchIcon" style={{fontSize:"30px"}} /></button>
            </div>

            <Link to="/yourAccount" style={{textDecoration: "none", color: "white"}}>
                <div className={active == 0 ? "headerOption yourAccountLinkContainer drop":"headerOption yourAccountLinkContainer"}>
                    <span className="headerOptionLineOne">Hello, {user ? user.username : "Sign In"}</span>
                    <div className="headerOption2">
                        <span className="headerOptionLineTwo">Account & Lists</span>
                        <ArrowDropDownIcon className="accountDropDownArrowIcon" />
                    </div> 
                </div>
            </Link>

            <Link to="/returnsAndOrders" style={{textDecoration:"none", color:"white"}}>
                <div className={active == 0 ? "headerOption returnsAndOrdersLogoContainer drop":"headerOption returnsAndOrdersLogoContainer"}>
                    <span className="headerOptionLineOne">Returns</span>
                    <span className="headerOptionLineTwo">& Orders</span>
                </div>
            </Link>


            <Link className={active == 0 ? "drop" : ""} to="/cart" style={{textDecoration:"none", color:"white"}}>
                <div className="cartContainer">
                    <ShoppingCartOutlinedIcon />
                    <span className="cartNumber">{cartNumber}</span> 
                    <span className="headerOptionLineTwo">Cart</span>
                </div>
            </Link>

        </div>
        
    )
}
