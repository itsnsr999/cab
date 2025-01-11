import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'

import React from 'react'

function CheckoutForm({amount}) {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (elements == null) {
          return;
        }
      
        const { error: submitError } = await elements.submit();
        if (submitError) {
          return;
        }
      
        try {
          const res = await fetch('/api/create-intent', {
            method: 'POST',
            body: JSON.stringify({ amount }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!res.ok) {
            const errorData = await res.json(); // Attempt to parse error response
            const errorMessage = errorData?.message || 'API request failed';
            throw new Error(errorMessage);
          }
      
          const data = await res.json();
          const clientSecret = data.clientSecret;
      
          // ... rest of your code
        } catch (error) {
          console.error('Error:', error);
          // Handle error, e.g., display an error message to the user
        }
      };
      
      
  return (
    <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center", marginTop:"1.5rem"
    }}>
        <h2 style={{
            margin:"1.25rem",
            fontWeight:"bold"
        }}>Total Amount {amount}</h2>
        <form onSubmit={handleSubmit} style={{
            maxWidth:"28rem"
        }}>
            <PaymentElement/>
            <button style={{width:"100%", background:"black", color:"white", padding:"0.5rem", marginTop:"0.5rem", borderRadius:"0.5rem"}}>Pay</button>
        </form>
    </div>
  )
}

export default CheckoutForm