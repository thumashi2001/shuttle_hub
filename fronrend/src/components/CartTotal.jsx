import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, cartItems } = useContext(ShopContext);
  console.log("getCartAmount:", getCartAmount);  // ✅ Check if it's defined

  // Avoid multiple calls to getCartAmount()
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        {/* Display item breakdown */}
        {cartItems && cartItems.length > 0 && (
          <div>
            <h3 className="font-semibold">Item Breakdown:</h3>
            {cartItems.map((item) => {
              const itemTotal = item.quantity * item.price; // Calculate total for each item
              return (
                <div key={item.id} className="flex justify-between">
                  <p>{item.name} ({item.quantity} x {currency}{item.price.toFixed(2)})</p>
                  <p>{currency}{itemTotal.toFixed(2)}</p> {/* Display CARTTOTAL for this item */}
                </div>
              );
            })}
          </div>
        )}
        <hr />
        {/* Subtotal, Shipping Fee and Total */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{subtotal === 0 ? 0 : delivery_fee.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{total.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

