import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Basket from "./Basket";
import CheckoutForm from "../components/Stripe/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const Checkout = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <Basket />
        </div>
        <div className="col-md-4">
          <div className="mt-5">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
