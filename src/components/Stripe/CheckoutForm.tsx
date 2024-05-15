import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
      billing_details: {
        email: email,
        name: name,
        address: {
          country: country,
          postal_code: zip
        }
      }
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(false);
    } else {
      setPaymentError(null);
      setPaymentSuccess(true);
      // Call your server to handle the payment
      handlePayment(paymentMethod!);
    }
  };

  const handlePayment = async (paymentMethod: any) => {
    // Send payment details to your server
    const response = await fetch("/api/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        payment_method: paymentMethod.id
      })
    });

    if (response.ok) {
      console.log("Payment successful!");
    } else {
      console.error("Payment failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
      <div className="mb-3 d-flex justify-content-center align-items-center">
        <img src="https://th.bing.com/th/id/OIP.n3juj74Ink3l-dPHR6u8QAHaFj?w=211&h=180&c=7&r=0&o=5&pid=1.7" alt="MobilePay" width="50" height="50" />
      </div>
      <div className="mb-3">
        <label className="form-label text-muted" >Betal med kort</label>
      </div>
      <label className="form-label">Email</label>
      <div className="mb-3">
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="form-label">Kortoplysninger</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4"
                }
              },
              invalid: {
                color: "#9e2146"
              }
            }
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Navn på kort</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Land</label>
          <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Postnummer</label>
          <input type="text" className="form-control" value={zip} onChange={(e) => setZip(e.target.value)} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={!stripe}>
        Betal
      </button>
      {paymentError && <p className="text-danger mt-3">{paymentError}</p>}
      {paymentSuccess && <p className="text-success mt-3">Payment successful!</p>}
    </form>
  );
};

export default CheckoutForm;