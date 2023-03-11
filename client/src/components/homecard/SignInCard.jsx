import "./signincard.css"
import { Link } from "react-router-dom"

export default function SignInCard(props) {
    return (
        <div className="signInCardContainer">
            <div className="title">
                <p>Sign In for your best experience</p>
            </div>
            <Link to="/login">
            <div className="signInButton">
                <button>Sign in securely</button> 
            </div>
            </Link>
            <div className="freeProduct"> <img className="primeDayImage" src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/ACQ/PD22/GW/IN-PD-22-teaser-GW_758x608_eng._SY608_CB631802614_.jpg" alt="" /></div>
        </div>
    )
}