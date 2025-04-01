import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const PaymentDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { cardNumber: '', expiry: '', cvv: '' };

    // Card Number validation: required, exactly 16 digits
    if (!paymentData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card Number is required';
      isValid = false;
    } else if (!/^\d{16}$/.test(paymentData.cardNumber.trim())) {
      newErrors.cardNumber = 'Card Number must be exactly 16 digits';
      isValid = false;
    }

    // Expiry Date validation: required, format MM/YY, not in the past
    if (!paymentData.expiry.trim()) {
      newErrors.expiry = 'Expiry Date is required';
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiry.trim())) {
      newErrors.expiry = 'Expiry Date must be in MM/YY format';
      isValid = false;
    } else {
      const [month, year] = paymentData.expiry.split('/').map(Number);
      const currentDate = new Date(); // Current date: March 23, 2025
      const currentYear = currentDate.getFullYear() % 100; // Last two digits of the year (25 for 2025)
      const currentMonth = currentDate.getMonth() + 1; // 0-based month (March = 3)

      const expiryYear = parseInt(year, 10);
      const expiryMonth = parseInt(month, 10);

      if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        newErrors.expiry = 'Expiry Date must not be in the past';
        isValid = false;
      }
    }

    // CVV validation: required, exactly 3 digits
    if (!paymentData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
      isValid = false;
    } else if (!/^\d{3}$/.test(paymentData.cvv.trim())) {
      newErrors.cvv = 'CVV must be exactly 3 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const orderData = {
      design: state.design,
      delivery: state.delivery,
      payment: paymentData,
    };

    try {
      await axios.post('http://localhost:5000/api/orders/send-email', orderData);
      toast.success("Order notification email sent to ShuttleHub!");
    } catch (error) {
      toast.error("Failed to send order notification email");
      console.error('Error sending email:', error);
    }

    navigate('/order-placed', { state: { design: state.design, delivery: state.delivery, payment: paymentData } });
    toast.success("Payment processed successfully!");
  };

  return (
    <div
      style={{
        paddingTop: '1rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingBottom: '20rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '28rem', width: '100%' }}>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#14b8a6',
            textAlign: 'center',
          }}
        >
          Payment Details
        </h1>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            width: '100%',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <Label htmlFor="cardNumber" style={{ fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
                Card Number
              </Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.5rem',
                  border: errors.cardNumber ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = errors.cardNumber ? '#ef4444' : '#14b8a6')}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.cardNumber ? '#ef4444' : '#d1d5db')}
              />
              {errors.cardNumber && (
                <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                  {errors.cardNumber}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="expiry" style={{ fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
                Expiry Date
              </Label>
              <Input
                id="expiry"
                name="expiry"
                value={paymentData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.5rem',
                  border: errors.expiry ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = errors.expiry ? '#ef4444' : '#14b8a6')}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.expiry ? '#ef4444' : '#d1d5db')}
              />
              {errors.expiry && (
                <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                  {errors.expiry}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="cvv" style={{ fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
                CVV
              </Label>
              <Input
                id="cvv"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="123"
                style={{
                  width: '100%',
                  marginTop: '0.25rem',
                  padding: '0.5rem',
                  border: errors.cvv ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = errors.cvv ? '#ef4444' : '#14b8a6')}
                onBlur={(e) => (e.currentTarget.style.borderColor = errors.cvv ? '#ef4444' : '#d1d5db')}
              />
              {errors.cvv && (
                <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                  {errors.cvv}
                </p>
              )}
            </div>
            <Button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#14b8a6',
                color: '#ffffff',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0f766e')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#14b8a6')}
            >
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;