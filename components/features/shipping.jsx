import React from "react";
import Shipping from "~/public/svg";

export default function ShippingTime() {
  const currentDate = new Date();
  const shippingDate = new Date(
    currentDate.getTime() + 3 * 24 * 60 * 60 * 1000
  ); // Add 3 days
  const deliveryDate = new Date(
    currentDate.getTime() + 4 * 24 * 60 * 60 * 1000
  ); // Add 4 days

  const options = { month: "short", day: "numeric" };
  const formattedShipping = shippingDate.toLocaleDateString(undefined, options);
  const formattedDelivery = deliveryDate.toLocaleDateString(undefined, options);

  return (
    <div className="shipping">
      <Shipping />
      <p>
        Get it by {formattedShipping} - {formattedDelivery}
      </p>
    </div>
  );
}
