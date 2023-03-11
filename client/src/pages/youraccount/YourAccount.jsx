import "./youraccount.css"
import Navbar from "../../components/navbar/Navbar"
import { Link } from "react-router-dom";
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function YourAccount() {


    const images = ["https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png",
                    "https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png",
                    "https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/rc_prime._CB485926807_.png",
                    "https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png",
                    "https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/Payments._CB485926359_.png",
                    "https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/amazon_pay._CB485946857_.png",
                    "https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/contact_us._CB623781998_.png"]

    const infoLine1 = ["Your Orders", "Login & Security", "Prime", "Your Address", "Payment options", "Amazon Pay balance", "Customer Service"]

    const infoLine2 = ["Track, return, or buy things again", "Edit login, name, and mobile number", "View benefits and payment settings",
                        "Edit address for orders and gifts", "Edit or add payment methods", "Add money to your balance", ""]

    const links = ["/returnsAndOrders", "/editInfo", "/yourAccount", "/yourAddresses", "/yourAccount", "/yourAccount", "/customerService"]

    const options = images.map((image, i) => {
        return [image, infoLine1[i], infoLine2[i], links[i]]
    });

    const handleLogout = () => {
        localStorage.removeItem("user");
        document.location.reload();
    }

    return (
        <>
            <Navbar />
            <SecondNavbar />
            <div className="yourAccountWrapper">
                <div className="yourAccountHeader">
                    <p>Your Account</p>
                </div>
                <div className="yourAccountOptionsContainer">

                    {options.map((option) => {
                        return (
                            <Link to={option[3]} style={{textDecoration: "none", color: "rgb(202, 195, 195)"}}>
                            <div className="yourAccountOption">
                                <div className="yourAccountOptionImage">
                                    <img src={option[0]} alt="" />
                                </div>
                                <div className="yourAccountOptionInfo">
                                    <div style={{color: "black"}} className="yourAccountOptionInfoLine1">{option[1]}</div>
                                    <div className="yourAccountOptionInfoLine2">{option[2]}</div>
                                </div>
                            </div>
                            </Link>
                        )
                    })}

                        <div className="yourAccountOption" onClick={handleLogout}>
                            <div className="yourAccountOptionImage">
                                <ExitToAppIcon style={{fontSize: "70px"}} />
                            </div>
                            <div className="yourAccountOptionInfo">
                                <div style={{color: "black"}} className="yourAccountOptionInfoLine1">Logout</div>
                            </div>
                        </div>
                </div>

                <hr className="yourAccountHr" />

                <div className="yourAccountFooter">
                    <div className="footerOptionContainer1">
                        <div className="footerOption">
                            <div className="footerOptionHeader">Digital Content and devices</div>
                            <div className="footerOptionLinks">
                                <ul>
                                    <li>Apps and more</li>
                                    <li>Contents and devices</li>
                                    <li>Digital gifts you've received</li>
                                </ul>
                            </div>
                        </div>

                        <div className="footerOption">
                            <div className="footerOptionHeader">Email alerts, messages, and ads</div>
                            <div className="footerOptionLinks">
                                <ul>
                                    <li>Advertising preferences</li>
                                    <li>Communication preferences</li>
                                    <li>SMS alert preferences</li>
                                    <li>Message center</li>
                                    <li>Alexa shopping notifications</li>
                                    <li>Deals Notifications</li>
                                </ul>
                            </div>
                        </div>

                        <div className="footerOption">
                            <div className="footerOptionHeader">More ways to pay</div>
                            <div className="footerOptionLinks">
                                <ul>
                                    <li>Default Purchase Settings</li>
                                    <li>Amazon Pay</li>
                                    <li>Bank accounts for refunds</li>
                                    <li>Coupons</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="footerOptionContainer1">
                        <div className="footerOption">
                            <div className="footerOptionHeader">Ordering and shopping preferences</div>
                            <div className="footerOptionLinks">
                                <ul>
                                    <li>Leave packaging feedback</li>
                                    <li>Lists</li>
                                    <li>Manage saved IDs</li>
                                    <li>Profile</li>
                                    <li>Language settings</li>
                                </ul>
                            </div>
                        </div>

                        <div className="footerOption">
                            <div className="footerOptionHeader">Other accounts</div>
                            <div className="footerOptionLinks">
                                <ul>
                                    <li>Account Linking</li>
                                    <li>Amazon Business registration</li>
                                    <li>Seller account</li>
                                    <li>Amazon Web Services</li>
                                    <li>Login with Amazon</li>
                                </ul>
                            </div>
                        </div>

                        <div className="footerOption">
                            <div className="footerOptionHeader">Shopping programs and rentals</div>
                            <div className="footerOptionLinks">
                                <ul>
                                    <li>Manage Your Profiles</li>
                                    <li>Subscribe & Save</li>
                                    <li>Shop the Kids' Store by age</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="footerOptionContainer2">
                        <div className="footerOption">
                            <div className="footerOptionHeader">Subscriptions</div>
                            <div className="footerOptionLinks">
                                <ul>
                                    <li>Email</li>
                                    <li>Memberships & Subscriptions</li>
                                </ul>
                            </div>
                        </div>

                        <div className="footerOption">
                            <div className="footerOptionHeader">Data and Privacy</div>
                            <div className="footerOptionLinks">
                                <ul>
                                    <li>Request Your Information</li>
                                    <li>Close Your Amazon Account</li>
                                    <li>Privacy Notice</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            
        </>
    )
}
