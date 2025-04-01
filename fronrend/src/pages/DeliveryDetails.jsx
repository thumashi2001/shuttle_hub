import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const DeliveryDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [deliveryData, setDeliveryData] = useState({
    address: '',
    city: '',
    zip: '',
  });
  const [errors, setErrors] = useState({
    address: '',
    city: '',
    zip: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { address: '', city: '', zip: '' };

    if (!deliveryData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    } else if (deliveryData.address.trim().length < 5) {
      newErrors.address = 'Address must be at least 5 characters long';
      isValid = false;
    }

    if (!deliveryData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(deliveryData.city.trim())) {
      newErrors.city = 'City must contain only letters and spaces';
      isValid = false;
    }

    if (!deliveryData.zip.trim()) {
      newErrors.zip = 'ZIP Code is required';
      isValid = false;
    } else if (!/^\d{5}$/.test(deliveryData.zip.trim())) {
      newErrors.zip = 'ZIP Code must be exactly 5 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryData({ ...deliveryData, [name]: value });

    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    navigate('/payment-details', { state: { design: state.design, delivery: deliveryData } });
    toast.success("Delivery details saved!");
  };

  return (
    <div style={{ paddingTop: '4rem', paddingLeft: '18rem', paddingRight: '1rem', maxWidth: '80rem', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#14b8a6' }}>
        Delivery Details
      </h1>
      <div
        style={{
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          maxWidth: '28rem',
          marginLeft: 'auto', // Moves the card to the right side
          marginRight: '20rem', // Adjust this value to control how far right it moves
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Label htmlFor="address" style={{ fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={deliveryData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              style={{
                width: '100%',
                marginTop: '0.25rem',
                padding: '0.5rem',
                border: errors.address ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = errors.address ? '#ef4444' : '#14b8a6')}
              onBlur={(e) => (e.currentTarget.style.borderColor = errors.address ? '#ef4444' : '#d1d5db')}
            />
            {errors.address && (
              <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                {errors.address}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="city" style={{ fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
              City
            </Label>
            <Input
              id="city"
              name="city"
              value={deliveryData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              style={{
                width: '100%',
                marginTop: '0.25rem',
                padding: '0.5rem',
                border: errors.city ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = errors.city ? '#ef4444' : '#14b8a6')}
              onBlur={(e) => (e.currentTarget.style.borderColor = errors.city ? '#ef4444' : '#d1d5db')}
            />
            {errors.city && (
              <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                {errors.city}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="zip" style={{ fontSize: '1rem', fontWeight: '500', color: '#374151' }}>
              ZIP Code
            </Label>
            <Input
              id="zip"
              name="zip"
              value={deliveryData.zip}
              onChange={handleChange}
              placeholder="Enter your ZIP code"
              style={{
                width: '100%',
                marginTop: '0.25rem',
                padding: '0.5rem',
                border: errors.zip ? '1px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '0.375rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = errors.zip ? '#ef4444' : '#14b8a6')}
              onBlur={(e) => (e.currentTarget.style.borderColor = errors.zip ? '#ef4444' : '#d1d5db')}
            />
            {errors.zip && (
              <p style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.25rem' }}>
                {errors.zip}
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
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryDetails;
