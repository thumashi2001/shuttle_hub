import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  // Get products and currency from ShopContext
  const { products, currency } = useContext(ShopContext);

  // Calculate the total and subtotal
  const itemDetails = products.map(item => {
    const quantity = item.quantity || 1; // Default to 1 if quantity is not provided
    const subtotal = quantity * item.price; // Calculate the subtotal for each item
    return {
      name: item.name,
      quantity,
      price: item.price,
      subtotal
    };
  });

  // Calculate the grand total and shipping fee
  const subtotal = itemDetails.reduce((total, item) => total + item.subtotal, 0);
  const shippingFee = 5.00; // Set a static shipping fee for now
  const total = subtotal + shippingFee;

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"ORDERS"} />
      </div>

      {/* Display the item breakdown */}
      <div className="mt-8">
        <div className="text-lg font-medium">Item Breakdown:</div>
        {itemDetails.map((item, index) => (
          <div key={index} className="py-4 flex justify-between items-center border-t">
            <div className="flex gap-2">
              <p>{item.name} ({item.quantity} x {currency}{item.price.toFixed(2)})</p>
            </div>
            <div className="font-medium">{currency}{item.subtotal.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* Subtotal, shipping fee, and total */}
      <div className="mt-6">
        <div className="flex justify-between text-lg font-medium">
          <p>Subtotal:</p>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-lg font-medium mt-2">
          <p>Shipping Fee:</p>
          <p>{currency}{shippingFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-xl font-bold mt-4">
          <p>Total:</p>
          <p>{currency}{total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;