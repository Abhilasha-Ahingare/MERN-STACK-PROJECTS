import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onsuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AYuD-jvksfOcW8UqPEqrEsFrtLZM2p9_X_Zb0QXShwsFUzioolb8C1Zva966o8aFWGzu-czcmkllE2FP",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, action) => {
          return action.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        }}
        onApprove={(data, action) => {
          return action.order.capture().then(onsuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
