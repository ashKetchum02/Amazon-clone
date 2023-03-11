import Navbar from "../../components/navbar/Navbar";
import "./home.css"
import ProductHome from "../../components/producthome/ProductHome";
import HomeCard from "../../components/homecard/HomeCard";
import SignInCard from "../../components/homecard/SignInCard";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";

export default function Home() {

    var temp = localStorage.getItem("products")
    const [cartNumber, setCartNumber] = useState(temp ? JSON.parse(temp).length : 0);
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        var products = localStorage.getItem("products")
        if (!products) {
            localStorage.setItem("products", JSON.stringify([]));
            products = localStorage.getItem("products")
        }

    }, [cartNumber]);

    const handleAdd = (e) => {

        e.preventDefault();

        var products = JSON.parse(localStorage.getItem("products"));

        if (!products) {
            localStorage.setItem("products", JSON.stringify([]));
            products = JSON.parse(localStorage.getItem("products"));
            products.push({productImage: e.target[5].value, productName: e.target[0].value, productPrice: e.target[1].value, productId: e.target[2].value, productReviews: e.target[3].value, productRating: e.target[4].value});
            localStorage.setItem('products', JSON.stringify(products));
        }

        else {
            products.push({productImage: e.target[5].value, productName: e.target[0].value, productPrice: e.target[1].value, productId: e.target[2].value, productReviews: e.target[3].value, productRating: e.target[4].value});
            localStorage.setItem('products', JSON.stringify(products));
        }
        setCartNumber(cartNumber + 1);
    };


    const images1 = ["https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-1-372-232._SY232_CB636110853_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-2-372-232._SY232_CB636110853_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-3-372-232._SY232_CB636110853_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF_4-372-232._SY232_CB636110853_.jpg"]
    const spans1 = ["Clothing", "Footwear", "Watches", "Bags & Luggage"]

    const images2 = ["https://images-eu.ssl-images-amazon.com/images/G/31/img21/AmazonBrands/GW/TV_2x._SY232_CB627276474_.jpg", 
                    "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonSmallBusinessDay/PrivateBrands/GW20/GW_Desktop_QC_Appliances_2X_V2_3._SY232_CB636581536_.jpg", 
                    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/AmazonBrands/GW/Furniture_2x._SY232_CB627276484_.jpg",  
                    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/AmazonBrands/GW/Kitchen2x._SY232_CB627276315_.jpg"]
    const spans2 = ["Smart LED TVs", "Appliances", "Furniture", "Kitchen Products"]

    const images3 = ["https://images-eu.ssl-images-amazon.com/images/G/31/Cons2022-Vernac/PD2022/PC_QuadCard_1_2X._SY232_CB632760922_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/Cons2022-Vernac/PD2022/PC_QuadCard_2_2X._SY232_CB632760922_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/Cons2022-Vernac/PD2022/PC_QuadCard_4_2X._SY232_CB632760922_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/Cons2022-Vernac/PD2022/PC_QuadCard_3_2X._SY232_CB632760922_.jpg"]
    const spans3 = ["Health and household", "Grocery essentials", "Baby products", "Pet supplies"]

    const images4 = ["https://images-eu.ssl-images-amazon.com/images/G/31/AmazonPay/Rewards/GWBTFPercolateCards/PC_Quard_Card_372X232_ScratchCard._SY232_CB627364751_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonPay/Rewards/GWBTFPercolateCards/PC_Quard_Card_372X232_CollectedOffers._SY232_CB627364751_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonPay/Rewards/GWBTFPercolateCards/PC_Quard_Card_372X232_WinMore._SY232_CB627364751_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/img17/APay_Rewards/Rewards2x._SY232_CB633810883_.jpg"]
    const spans4 = ["Claim your scratch cards", "Redeem your collected rewards", "Unlock more rewards when you shop or pay", "Explore all offers in one place"]

    const images5 = ["https://images-eu.ssl-images-amazon.com/images/G/31/img19/2020/PC/Fresh._SY232_CB431401553_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/img19/2020/PC/Mobile._SY232_CB431401553_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/img19/2020/PC/Fashion._SY232_CB431401553_.jpg",
                    "https://images-eu.ssl-images-amazon.com/images/G/31/img19/2020/PC/Electronic._SY232_CB431401553_.jpg"]
    const spans5 = ["Fresh", "Mobiles", "Fashion", "Electronics"]

    return (
        <>
        <Navbar />
        <SecondNavbar />
        <div className="home">
            <div className="homeContainer">
                <a target="_blank" href="https://www.primevideo.com/?ref_=dvm_pds_amz_in_as_s_g_176"><img className="homeImage" src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/PD22/GW/ACQ/PC_Hero_3000x1200_ho._CB631612836_.jpg" alt="" /></a>
                <div className="homeRow firstHomeRow" >
                    <HomeCard title="Upto 70% off | Styles for Men" images={images1} spans={spans1} link="End of season sale" />
                    <ProductHome name="Upto 70% off | Clearance Store" image="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/Clearance/Clearance_store_Desktop_CC_2x._SY608_CB628315133_.jpg" />
                    <HomeCard title="Upgrade your home | Amazon brands & more" images={images2} spans={spans2} link="Shop now" />
                    {user ? <form className="remove" style={{marginTop: "80px"}} onSubmit={handleAdd}><ProductHome key={9} id={"9"} reviews="10,223" rating="5" name="Apple iPhone 12 (64 GB) - Purple" image="https://m.media-amazon.com/images/I/71hVxI-Ed-S._AC_UY436_QL65_.jpg" price="55,990.00" product/></form> : <SignInCard />}
                </div>
                <div className="homeRow" style={{justifyContent: "center"}}>
                    <HomeCard title="Upto 60% off | Daily essesntials" images={images3} spans={spans3} link="End of season sale" />
                    <HomeCard title="Upgrade your home | Amazon brands & more" images={images4} spans={spans4} link="Shop now" />
                    <HomeCard title="Shop by category" images={images5} spans={spans5} link="Shop now" />
                </div>
                <div className="homeRow">
                    <form className="remove" onSubmit={handleAdd}><ProductHome key={9} id={"9"} reviews="10,223" rating="5" name="Apple iPhone 12 (64 GB) - Purple" image="https://m.media-amazon.com/images/I/71hVxI-Ed-S._AC_UY436_QL65_.jpg" price="55,990.00" product/></form>
                    <form onSubmit={handleAdd}><ProductHome key={18} id={"18"} reviews="4,223" rating="4" name="Razer Nari Ultimate Wireless 7.1 Surround Sound Gaming Headset: THX Audio & Haptic Feedback - Auto-Adjust Headband - Chroma RGB - Retractable Mic - For PC, PS4, PS5 - Black" image="https://m.media-amazon.com/images/I/81f6DNi4TFL._AC_SL1500_.jpg" price="16,000.00" product /></form>
                    <form onSubmit={handleAdd}><ProductHome key={19} id={"19"} reviews="1,398" rating="4.5" name="Apple iPad Pro 12.9-inch, Wi-Fi, 3rd Generation 64GB - Space Gray" image="https://m.media-amazon.com/images/I/61DsXT1ldtL._AC_SL1500_.jpg" price="69,049.00" product /></form>
                </div>
                <div className="homeRow">
                    <form onSubmit={handleAdd}><ProductHome key={20} id={"20"} reviews="1,398" name="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440" rating="4" image="https://m.media-amazon.com/images/I/71MlcO29QOL._AC_UY436_QL65_.jpg" price="80,000.00" product /></form>
                    <form onSubmit={handleAdd}><ProductHome key={1} id={"1"} reviews="1,398" name="Dell Alienware x15 R1 (2021) Intel i7-11800H 15.6 inches FHD Gaming Laptop, (32GB, 1TB SSD, NVIDIA RTX 3070 8GB, Windows 11, MSO 21, 300 nits 360Hz, Alien FX, Lunar Light, D569933WIN9)" image="https://m.media-amazon.com/images/I/61J++6x4ezL._AC_UY436_QL65_.jpg" rating="5" price="2,89,990" product /></form>
                </div>
                
                <div className="homeRow">
                    <form onSubmit={handleAdd}><ProductHome key={17} id={"17"} reviews="181" rating="4" name="Samsung Odyssey LED 2560 x 1440 Pixels 32 Inches 1000R, 240 Hz, 1ms, WQHD, HDR 600, G-Sync Compatible Curved Gaming Monitor (LC32G75TQSWXXL, Black)" image="https://m.media-amazon.com/images/I/71LpkdG1xUL._AC_UY436_QL65_.jpg" price="43,049.00" product /></form>
                    <form onSubmit={handleAdd}><ProductHome key={21} id={"21"} reviews="9,983" rating="4" name="MI Rechargeable Electric Toothbrush T100 with Dual Pro Mode & USB Fast Charging (White)" image="https://m.media-amazon.com/images/I/61R3a2YTMmS._AC_UL640_QL65_.jpg" price="599.00" product /></form>
                    <form onSubmit={handleAdd}><ProductHome key={22} id={"22"} reviews="5,223" rating="3.5" name="Oral B Vitality 100 Black Criss Cross Electric Rechargeable Toothbrush Powered by Braun" image="https://m.media-amazon.com/images/I/61fH4IhS5BL._AC_UL640_QL65_.jpg" price="1,299.00" product /></form>
                </div>
            </div>
        </div>
        </>
    )
}