import React from 'react'
import axios from 'axios';
const Payment = () => {

    const config = {
        publicKey: "",
        productIdentity:"1234567890",
        productName: "Khalti",
        productUrl:"http://localhost:3000/product",
        eventHandler:{
            onSuccess(payload){
                console.log("Payment SUccess:", payload);

                axios.post("http://localhost:8000/api/verify-khalti", {
                    token: payload.token,
                    amount: payload.amount,
                }).then(res => alert(res.data.message)).catch(err => alert("verification failed"));
            },
            onError(error){
                console.log("Payment Error", error);
            },
            onClose() {
                console.log("Closing...");
            }
        },
        paymentPreference: ["KHALTI"]
    };

    const khaltiCheckout = new window.khaltiCheckout(config);

  return (
    <>
        <button onClick={() => khaltiCheckout.show({amount: 1000})}>Pay With Khalti</button>
    </>
  );
};

export default Payment
