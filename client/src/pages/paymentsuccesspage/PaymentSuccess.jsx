import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./paymentsuccess.css"

export default function PaymentSuccess() {

    const navigate = useNavigate()

    function animate() {
        setTimeout(() => {
            const div = document.getElementsByClassName("paymentSuccessContainer")[0]
            div.classList.remove("paymentSuccessContainer")
            div.classList.add("squeezed")
            setTimeout(() => {
                div.classList.add("invisible")
                setTimeout(() => {
                    document.getElementsByClassName("checkmark")[0].classList.remove("hidden")
                    document.getElementsByClassName("checkmark")[0].classList.add("bounce")
                    setTimeout(() => {
                        navigate("/cart");
                    }, 2000)
                }, 800)
            }, 1000)
        }, 1500)
    }

    useEffect(() => {
        animate()
    }, [])

    return (

        <>

        <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" className="paymentSuccessLogo" />
        <div className="paymentSuccessWrapper">
            
            <span className="checkmark hidden">
                <div className="checkmark_stem"></div>
                <div className="checkmark_kick"></div>
            </span>
            <div className="paymentSuccessContainer">
                <p>Payment Processing</p>
            </div>

        </div>

        </>
    )
}
