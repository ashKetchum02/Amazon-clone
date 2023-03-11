import "./returnsandorders.css"
import Navbar from "../../components/navbar/Navbar"
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import SecondNavbar from "../../components/secondnavbar/SecondNavbar";
// import axios from "axios"

export default function ReturnsAndOrders() {

    const user = JSON.parse(localStorage.getItem("user"));
    const allOrders = user.orderHistory
    const [orders, setOrders] = useState(user.orderHistory);

    useEffect(() => {

    }, [orders])

    const handleSelectChange = () => {

        const newSelectValue = document.getElementById("history").value;

        if (newSelectValue.includes("All")) {
            setOrders(user.orderHistory)
            return;
        }

        const newOrders = []

        for (var i = 0; i < allOrders.length; i++) {
            const orderedOn = format(allOrders[i].orderedOn)
            // console.log(orderedOn);
            if (orderedOn.includes("second") || orderedOn.includes("minute") || orderedOn.includes("hour")) {
                // console.log(1);
                newOrders.push(allOrders[i])
            }

            else if (orderedOn.includes("day") && newSelectValue.includes("days")) {
                // console.log(2);
                if (parseInt(orderedOn.substr(0,2).trim()) <=  parseInt(newSelectValue.substr(0, 2).trim())) {
                    newOrders.push(allOrders[i])
                }
            }

            else if (orderedOn.includes("day") && (newSelectValue.includes("month") || newSelectValue.includes("year"))) {
                // console.log(3);
                newOrders.push(allOrders[i])
            }
            else if (orderedOn.includes("month") && (newSelectValue.includes("month"))) {
                // console.log(4);
                if (parseInt(orderedOn.substr(0,2).trim()) <=  parseInt(newSelectValue.substr(0, 2).trim())) {
                    newOrders.push(allOrders[i])
                }
            }

            else if (orderedOn.includes("month") && (newSelectValue.includes("year"))) {
                // console.log(5);
                newOrders.push(allOrders[i])
            }

            else if (orderedOn.includes("year") && newSelectValue.includes("year")) {
                // console.log(6);
                if (parseInt(orderedOn.substr(0,2).trim()) <=  parseInt(newSelectValue.substr(0, 2).trim())) {
                    newOrders.push(allOrders[i])
                }
            }
        }

        setOrders(newOrders);
    }

    return (
        <>
         <Navbar />
         <SecondNavbar />
        <div className="returnsAndOrdersWrapper">

           
            <div className="returnsAndOrdersTitleContainer">
                    <div className="returnsAndOrdersTitleLeft">
                        <p>Your Orders</p>
                    </div>

                    <div className="returnsAndOrdersTitleRight">
                        <div className="returnsAndOrdersSearchBoxContainer">
                            <div><input className="returnsAndOrdersSearchBox" type="text" name="search" id="search" placeholder="Search all orders" /></div>
                            <div><button className="returnsAndOrdersSearchButton" >Search Orders</button></div>
                        </div>
                    </div>
            </div>

            <div className="returnsAndOrdersNav">
                <ul>
                    <li style={{borderBottom: "5px solid #FEBD69"}}>Orders</li>
                    <li>Buy Again</li>
                    <li>Open Orders</li>
                    <li>Local Store Orders</li>
                    <li>Cancelled Orders</li>
                </ul>
            </div>

            <div className="selectContainer">
                <div className="text"><p>Show orders placed in the last: </p></div>
                <div>
                    <select name="history" id="history" onChange={handleSelectChange}>
                        <option value="All Orders" selected>All Orders</option>
                        <option value="14 days">14 days</option>
                        <option value="30 days">30 days</option>
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="1 year">1 year</option>
                    </select>
                </div>
            </div>

            <div className="returnsAndOrdersProductsContainerWrapper">

                <div className="ordersContainerWrapper">
                {
                    orders.slice(0).reverse().map((order) => {
                        return ( 
                            
                            <div className="orderContainer">
                                <div className="orderHeader">
                                    <div className="orderHeaderLine1">
                                        <div className="orderOption">ORDER PLACED</div>
                                        <div className="orderOption">TOTAL</div>
                                        <div className="orderOption">SHIP TO</div>
                                        <div className="orderLastOption">ORDER #</div>
                                    </div>
                                    <div className="orderHeaderLine2">
                                        <div className="orderOption">{order.orderedOn.substr(0, 10)}</div>
                                        <div className="orderOption">₹{(order.amount).toLocaleString()}.00</div>
                                        <div className="orderOption" style={{color:"teal"}}>{user.username}</div>
                                        <div className="orderLastOption" style={{color:"teal"}}>{order.orderId}</div>
                                    </div>
                                </div>

                                <div className="returnsAndOrdersProductsContainer">
                                {
                                    order.products.map((product) => {
                                        return (
                                            <div className="returnsAndOrdersProductContainer">
                                                <div className="returnsAndOrdersProductImage">
                                                    <img src={product.productImage} alt="product" />
                                                </div>
                                                <div className="returnsAndOrdersProductNameContainer">
                                                    <div>
                                                    <p className="returnsAndOrdersProductName" style={{color: "teal"}}>{product.productName}</p>
                                                    <p style={{fontSize: "14px"}}>₹{product.productPrice}.00</p>
                                                    </div>
                                                    <div><button className="reviewButton">Write a product review</button></div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="archive">Archive Order</div>
                                </div>

                            </div> 

                        )
                    })
                
                }
                </div>
            </div>
        </div>
        </>
    )
}
