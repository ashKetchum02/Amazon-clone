import axios from "axios";

function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

async function displayRazorpay(info) {
        const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const result = await axios.post("/api/payment/orders", {amount: info.amount}).catch(e => console.log(e));

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_4IkOiOg6yhObnK", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Amazon-clone.in",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post("/api/payment/success", data).catch(e => console.log(e));

            // alert(result.data.msg);
            if (result.data.msg == "success") {
                const cartItems = JSON.parse(localStorage.getItem("products"));
                const curUser = JSON.parse(localStorage.getItem("user"));
                curUser.orderHistory.push({orderId: order_id, paymentId: result.data.paymentId, products: cartItems, orderedOn: new Date(), amount: info.amount})
                axios.put("/api/users/newOrder", {email: curUser.email, newOrder: {orderId: order_id, paymentId: result.data.paymentId, products: cartItems, orderedOn: new Date(), amount: info.amount}});
                localStorage.setItem("products", JSON.stringify([]));
                localStorage.setItem("user", JSON.stringify(curUser));
                setTimeout(() => {
                    // window.location.replace("http://localhost:3000/paymentSuccess");
                    info.navigate("/paymentSuccess")
                }, 300)
            }
        },
        prefill: {
            name: info.username,
            email: info.email,
            contact: info.phone == "" ? "N/A" : info.phone,
        },
        notes: {
            address: info.address == "" ? "N/A" : info.address,
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

export { loadScript, displayRazorpay }
