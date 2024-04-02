import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  const location = useLocation();

  const { productName, productPrice } = location.state;

  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );

  const protectionFees = Number(productPrice / 10).toFixed(2);
  const shippingFees = Number(productPrice / 5).toFixed(2);
  let result =
    Number(productPrice) + Number(protectionFees) + Number(shippingFees);

  const options = {
    mode: "payment",

    amount: Number((result * 100).toFixed(0)),

    currency: "eur",
  };

  return (
    <main className="main-payment">
      <div className="container">
        <div className="payment-container">
          <h3>Résumé de la commande</h3>
          <div className="first-section">
            <div>
              <p>Commande</p>
              <p>{productPrice}</p>
            </div>
            <div>
              <p>Frais protection acheteurs</p>
              <p>{protectionFees}</p>
            </div>
            <div>
              <p>Frais de port</p>
              <p>{shippingFees}</p>
            </div>
          </div>
          <div className="divider"></div>
          <div className="second-section">
            <div>
              <p>Total</p>
              <span>{result} €</span>
            </div>
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir
              <span> {productName}</span>. Vous allez payer
              <span> {result} € </span>
              (frais de protection et frais de port inclus).
            </p>
          </div>
          <div className="divider"></div>
          <div className="payment">
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm productName={productName} productPrice={result} />
            </Elements>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;
