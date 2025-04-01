import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';

const OrderPlaced = () => {
  const { state } = useLocation();

  return (
    <div className="pt-16 pl-72 pr-4 md:pr-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-primary">Order Placed Successfully!</h1>
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border max-w-md">
        <p className="text-muted-foreground mb-4">Thank you for your order. Here are the details:</p>
        <div className="space-y-2">
          <p><strong>Design Name:</strong> {state.design.name || 'Unnamed Design'}</p>
          <p><strong>Size:</strong> {state.design.size}</p>
          <p><strong>Color:</strong> {state.design.color}</p>
          <p><strong>Delivery Address:</strong> {state.delivery.address}, {state.delivery.city}, {state.delivery.zip}</p>
        </div>
        <Link to="/tshirt-view" className="mt-6 block">
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-white">
            Back to Designs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderPlaced;