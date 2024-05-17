import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { GroupedProductProps } from "./Basket";
import CheckoutForm from "../components/Stripe/CheckoutForm";
import { ProductProps } from "../service/ProductProps";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const Checkout = () => {
    const [basketItems, setBasketItems] = useState<GroupedProductProps[]>([]);
  
    useEffect(() => {
      loadBasketItems();
    }, []);
  
    const loadBasketItems = () => {
        const storedBasket = localStorage.getItem("basket");
        if (storedBasket) {
          const parsedItems: ProductProps[] = JSON.parse(storedBasket);
          const itemMap = new Map<number, GroupedProductProps>();
      
          // Group items by ID and calculate quantity
          parsedItems.forEach(item => {
            const existingItem = itemMap.get(item.id);
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              itemMap.set(item.id, { ...item, quantity: 1 });
            }
          });
      
          // Convert map values to array
          const uniqueItems = Array.from(itemMap.values());
          setBasketItems(uniqueItems);
        }
      };
      
  const formatPrice = (price: number): string => {
    const formattedPrice = price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedPrice.replace(".", ",");
  };

  const totalPrice = formatPrice(
    basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {/* Back to Basket link */}
          <Link to="/basket" className="checkout-back-link">
            <FaArrowLeft className="checkout-back-icon" />
            <span className="checkout-back-text">Tilbage til Kurv</span>
          </Link>          <h1 className="text-center mt-5 mb-4 playfair-display-font">Kurv</h1>
          <hr className="mb-0" />
          {basketItems.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Produkt</th>
                    <th scope="col">Størrelse</th>
                    <th scope="col">Antal</th>
                    <th scope="col">Pris</th>
                  </tr>
                </thead>
                <tbody>
{basketItems.map((item, index) => {

  return (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.chosenSize}</td>
      <td>{item.quantity}</td>
      <td>DKK {formatPrice(item.price * item.quantity)}</td>
    </tr>
  );
})}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">Din kurv er tom.</p>
          )}
          <div className="card border-0 rounded-0 ">
            <div className="card-body">
              <div className="row justify-content-between">
                <div className="col-sm-4">
                  <p className="card-text lora-font" style={{ fontSize: "18px" }}>
                    Subtotal:{" "}
                  </p>
                </div>
                <div className="col-sm-4">
                  <p className="card-text text-end noto-serif-jp-semibold">DKK {totalPrice} </p>
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-4">
                  <p className="card-text lora-font " style={{ fontSize: "18px" }}>
                    Levering:{" "}
                  </p>
                </div>
                <div className="col-4">
                  <p className="card-text text-end noto-serif-jp-semibold"> Gratis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <h1 className="text-center mt-5 mb-4 playfair-display-font">Betaling</h1>
            <hr className="mb-0" style={{marginBottom: "0px"}} />
          <div className="mt-5">
            <div className="card border-0 rounded-0 ">
              <div className="card-body" style={{paddingTop: "0"}}>
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
