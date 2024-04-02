import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ productName, productPrice }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentIsDone, setPaymentIsDone] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      if (elements == null) {
        return;
      }

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: productName,
          amount: productPrice,
        }
      );

      const clientSecret = response.data.client_secret;

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,

        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      console.log(paymentIntent);

      if (error) {
        setErrorMessage(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        setPaymentIsDone(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return paymentIsDone ? (
    <p>Paiement effectué</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="payment-submit"
        type="submit"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? "Traitement..." : "Payer"}
      </button>
      {errorMessage && <div className="error-checkout">{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
