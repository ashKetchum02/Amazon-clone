import "./secondnavbar.css";
import MenuIcon from '@material-ui/icons/Menu';

export default function SecondNavbar() {
    return (
        <>
            <div className="secondNavbarContainer">
                <ul>
                    <li> <MenuIcon /> <span style={{position: "relative", bottom: "5px"}}>All</span></li>
                    <li>Fresh</li>
                    <li>Amazon Pay</li>
                    <li>Today's deals</li>
                    <li>Best Sellers</li>
                    <li>Prime</li>
                    <li>Buy Again</li>
                    <li>Mobiles</li>
                    <li>Customer Sevice</li>
                    <li>Gift Cards</li>
                    <li>Electronics</li>
                    <li style={{marginLeft: "90px"}}><a target="_blank" href="https://www.primevideo.com"><img src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/ACQ/FT_SWM_400x39_211._CB623007921_.jpg" alt="" /></a></li>
                </ul>
            </div>
        </>
    )
}
