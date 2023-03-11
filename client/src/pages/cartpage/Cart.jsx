import "./cart.css"
import Navbar from "../../components/navbar/Navbar";
import ProductFooter from "../../components/productfooter/ProductFooter";
import { useState } from "react";
import { useEffect } from "react";
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { displayRazorpay } from "./razorpay";
import { images, names, prices, ratings, reviews, ids } from "./dummyData1";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";

export default function Cart() {

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();

    var temp = localStorage.getItem("products")
    const [cartNumber, setCartNumber] = useState(temp ? parseInt(JSON.parse(temp).length) : 0);

    const [cartTotal, setCartTotal] = useState();

    var cartItems = JSON.parse(temp)

    useEffect(() => {
        var cartProducts = localStorage.getItem("products")
        if (!cartProducts) {
            localStorage.setItem("products", JSON.stringify([]));
            cartProducts = localStorage.getItem("products")
        }
        cartItems = JSON.parse(cartProducts);

        var temp = 0;
        
        for(var i = 0; i < cartItems.length; i++) {
            temp = temp + parseFloat(cartItems[i].productPrice.replaceAll(",", ""))
        }

        setCartTotal(temp.toLocaleString());

    }, [cartNumber, cartTotal])

    var dummyProducts = images.map(function(e, i) {
        return [e, names[i], prices[i], ids[i], reviews[i], ratings[i]];
    });

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

    const handleRemove = (e) => {
        e.preventDefault();

        var cartProducts = JSON.parse(localStorage.getItem("products"));

        for (var i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i].productId == e.target[0].value) {
                cartProducts.splice(i, 1)
                break;
            }
        }
        localStorage.setItem('products', JSON.stringify(cartProducts));

        setCartNumber(cartNumber - 1);
    };

    const handleCheckout = async () => {
        
        // if (user.address === "" || user.phone === "") {
        //     navigate("/")
        //     return;
        // } 

        await displayRazorpay({amount: parseInt(cartTotal.replaceAll(",", "")), username: user.username, email: user.email, phone: user.phone, navigate: navigate});
    }
    
    return (
        <>
            <Navbar />
            <SecondNavbar />
            <div className="wrapper">
                <div className="cartContainer">
                    <div className="leftContainer" style={cartNumber == 0 ? {maxHeight: "40vh"} : {padding:"10px"}}>
                        {cartNumber == 0 ? <div className="emptyCart">
                                                <div>
                                                    <img className="emptyImage" src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" alt="" />
                                                </div>
                                                <div className="signIn">
                                                    <h2>Your Amazon cart is empty</h2>
                                                    <a href="">Shop Today's deals</a>
                                                    {user ? <div className="extraEmptyText">Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more. 
Continue shopping on the Amazon.in homepage, learn about today's deals, or visit your Wish List.</div> : <div className="buttons">

                                                                    <Link to="/login">
                                                                    <button className="signInButton">Sign in to your account</button>
                                                                    </Link>

                                                                    <button className="signUpButton">Sign up now</button>
                                                                </div>}
                                                    
                                                </div>
                                            </div>
                         : 
                                            <div className="cartContents">
                                                <div className="header">
                                                    <div className="headerOne">
                                                        <p>Shopping Cart</p>
                                                    </div>
                                                </div>

                                                <div className="productContainer">
                                                    {cartItems.map((p) => {
                                                        var rating = parseFloat(p.productRating);
                                                        var left = 5 - Math.ceil(rating);
                                                        var i = 0
                                                        var fullArr = []
                                                        var leftArr = []

                                                        for (i = 1; i <= rating; i++) {
                                                            fullArr.push(i)
                                                        }

                                                        rating -= i - 1;

                                                        for (i = 1; i <= left; i++) {
                                                            leftArr.push(i)
                                                        }

                                                        return (<form className="product" onSubmit={handleRemove}>
                                                        <div className="productImageCartContainer">
                                                        <img src={p.productImage} alt="" className="productImageCart" />
                                                        </div>
                                                        
                                                        <div className="firstLine">
                                                            <div className="productNameCart">{p.productName}</div>
                                                            <input type="hidden" name="id" value={p.productId}/>
                                                            <div className="productPriceCart"><span>₹</span>{p.productPrice}.00</div>
                                                            <div className="ratingCart">
                                                            {fullArr.map((i) => {
                                                                return <StarIcon style={{height:"20px"}} htmlColor="orange" />
                                                            })}
                                                            {rating==0.5 ? <StarHalfIcon style={{height:"20px"}} htmlColor="orange" /> : ""}
                                                            {leftArr.map((i) => {
                                                                return <StarOutlineIcon style={{height:"20px"}} htmlColor="orange" />
                                                            })}
                                                            <span>{p.productReviews}</span>
                                                            </div>
                                                            <div className="gift">
                                                                <div>
                                                                <input type="checkbox" name="gift" value="true" id="gift" onClick="this.checked=!this.checked;" />
                                                                </div> <div> <span className="giftText">This will be a gift<a href="">Learn More</a></span></div>
                                                            </div>
                                                            <button type="submit" className="removeFromCartButton">Remove from cart</button>
                                                        </div>
                                                    </form>)
                                                    })}
                                                    
                                                </div>
                                                {/* <div className="subTotal" style={{borderTop:"1px solid darkgrey", width: "96%", padding: "20px"}}>
                                                Subtotal ({cartNumber} items): <span style={{fontWeight: 400, fontSize:"15px", position:"relative", bottom:"2px"}}>₹</span><span>{cartTotal}</span>
                                                </div> */}
                                            </div>
                         }
                    </div> 

                    <div className="rightContainer">
                        {cartNumber == 0 ? 
                        <div className="suggestions">
                            <div className="title">Customers who bought items in your Recent History also bought</div>


                            {dummyProducts.map((product) => {
                                return (
                                    <form className="product" onSubmit={handleAdd}>
                                        <img className="productImage" src={product[0]} />
                                        <div className="productInfo">
                                            <label className="productName">{product[1].substr(0, 25)}...</label>
                                            <input type="hidden" name="name" value={product[1]}/>
                                            <label className="productPrice"><span>₹</span>{product[2]}.00</label>
                                            <input type="hidden" name="price" value={product[2]}/>
                                            <input type="hidden" name="id" value={product[3]}/>
                                            <input type="hidden" name="reviews" value={product[4]}/>
                                            <input type="hidden" name="rating" value={product[5]}/>
                                            <input type="hidden" name="image" value={product[0]}/>
                                            <button type="submit" className="addToCartButton">Add to cart</button>
                                        </div>
                                </form>
                                )
                            })}
                        
                        </div> 
                        
                        : 
                            <div className="subTotalContainer">
                                <div className="subTotalTitle">
                                    Subtotal ({cartNumber} items): <span style={{fontWeight: 400, fontSize:"15px", position:"relative", bottom:"2px"}}>₹</span><span>{cartTotal}.00</span>
                                </div>
                                <div className="extraInfo">
                                    <a>Your order is eligible for FREE Delivery</a>. Select this option at checkout. <a>Details</a>
                                </div>

                                <div className="gift">
                                    <div>
                                    <input type="checkbox" name="gift" value="true" id="gift" onClick="this.checked=!this.checked;" />
                                    </div> <div> <span className="giftText">This order contains a gift<a href="">Learn More</a></span></div>
                                </div>

                                <button onClick={handleCheckout} className="checkoutButton">Proceed to Buy</button>

                                <div className="primePromotion">
                                    <img src="https://assets.mspimages.in/wp-content/uploads/2021/07/amazon-prime-youth-offer.jpg" alt="" />
                                </div>

                            </div>
                            
                        }
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
            </div>
        </>
    )
}