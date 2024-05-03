import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Checkout.module.css";
import { loadStripe } from "@stripe/stripe-js";


const Checkout = () => {
  const [data, setData] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const {cartItems} = useSelector((state) => state.cart);
  console.log(cartItems)
 

  const makePayment = async()=>{
    const stripe = await loadStripe("pk_test_51PC7sWSDmPjhFyoEsufSmPNYcHAbPZR1Ih229LzvYJaMiprq44XhgXEMbp6RbZWl1IT6zCCw4xLslQiUSAZpSv4h00A8jiiYGU");

    const body = {
        userId:userInfo.id,
        userEmail : userInfo.email,


    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:3000/api/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}



  return (
    <>
      <div className={styles.main}>
        <div style={{
          display:"flex",
          flexDirection:"column",
          gap:"10px",
          padding:"20px",
          backgroundColor:"#fff",
          borderRadius:"10px",
          boxShadow:"0 0 10px rgba(0,0,0,0.1)"
        }}>

        <h1 style={{
          marginBottom:"20px",
          fontSize:"2rem",
          
        }}>Checkout</h1>
        <div style={{display:"flex"}}>

        <div style={{
          display:"flex",
          flexDirection:"column",
          gap:"10px",
          
          

        }} >
            <p>
                Total Amount: ₹{cartItems.reduce((acc, item) => acc + item.price, 0)}
            </p>
            <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#1ABA1A',
              color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '20px',
                cursor: 'pointer',
                
              }}
              onClick={makePayment}>Place Order</button>
        </div>
        </div>

              </div>
      </div>
    </>
  );
};



export default Checkout;
