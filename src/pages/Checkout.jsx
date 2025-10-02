import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getcarts } from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/api';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const data = await getcarts();
        if (data.length === 0) {
          navigate('/cart');
          return;
        }
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated, navigate]);

  const calculateTotals = () => {
    const itemTotal = cartItems.reduce(
      (sum, item) => sum + (item.product_price || item.price || 0) * item.quantity,
      0
    );
    const visitationFees = itemTotal < 200 ? 60 : 0;
    const taxesAndFees = Math.round(itemTotal * 0.1); // 10% tax
    const totalAmount = itemTotal + visitationFees + taxesAndFees;
    
    return {
      itemTotal,
      visitationFees,
      taxesAndFees,
      totalAmount
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!customerDetails.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!customerDetails.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!customerDetails.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!customerDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerDetails.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    if (!customerDetails.address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!selectedDate) {
      errors.date = 'Service date is required';
    }
    
    if (!paymentMethod) {
      errors.payment = 'Payment method is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayNow = async () => {
    if (!validateForm()) {
      return;
    }
    
    setProcessing(true);
    
    // START: Construct the data payload
    const orderData = {
      first_name: customerDetails.firstName,
      last_name: customerDetails.lastName,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: customerDetails.address,
      service_date: selectedDate,
      payment_method: paymentMethod
    };
    // END: Construct the data payload

    // *** IMPORTANT: LOG THE DATA BEFORE SENDING FOR DEBUGGING ***
    console.log("Sending Order Data:", orderData); 
    
    try {
      // Line 142 is here
      const response = await api.post('/create-order/', orderData); 
      
      if (response.data && response.data.order) {
        // Order created successfully
        const order = response.data.order;
        // ... (rest of your success logic) ...
        alert(`Payment successful! Your booking has been confirmed. Order Number: ${order.order_number}`);
        navigate('/', { 
            // ... (navigation state) ...
        });
      } else {
        throw new Error('Invalid response from server');
      }
      
    } catch (error) {
      console.error('Payment failed:', error);
      // ... (rest of your error handling) ...
      // ... (displaying a user-friendly error) ...
    } finally {
      setProcessing(false);
    }
};


  const handleDelete = () => {
    navigate('/cart');
  };

  const { itemTotal, visitationFees, taxesAndFees, totalAmount } = calculateTotals();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading checkout...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-orange-500 text-white rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {cartItems[0]?.product_title || 'Service Installation'}
                  </h2>
                  <p className="text-orange-100">
                    Service quantity: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                  <p className="text-orange-100">Amount: ₹{itemTotal}</p>
                </div>
              </div>
              
              <div className="border-t border-orange-400 pt-4">
                <h3 className="font-bold text-lg mb-3">Payment summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Item total</span>
                    <span>₹{itemTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Visitation fees</span>
                    <span>₹{visitationFees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes and fees</span>
                    <span>₹{taxesAndFees}</span>
                  </div>
                  <div className="border-t border-orange-400 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                  <div className="border-t border-orange-400 pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Amount to pay</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-bold transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                  className="flex-1 bg-white text-orange-500 py-3 px-6 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                >
                  Proceed
                </button>
              </div>
            </div>
            
            {/* Service Date Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">Select Services date</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border rounded-lg px-4 py-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="outline-none"
                  />
                </div>
                {formErrors.date && (
                  <span className="text-red-500 text-sm">{formErrors.date}</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Side - Customer Details & Payment */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Customer details</h2>
            
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={customerDetails.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="First Name"
                  />
                  {formErrors.firstName && (
                    <span className="text-red-500 text-sm">{formErrors.firstName}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={customerDetails.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Last Name"
                  />
                  {formErrors.lastName && (
                    <span className="text-red-500 text-sm">{formErrors.lastName}</span>
                  )}
                </div>
              </div>
              
              {/* Email and Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Email id"
                  />
                  {formErrors.email && (
                    <span className="text-red-500 text-sm">{formErrors.email}</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerDetails.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Phone number"
                  />
                  {formErrors.phone && (
                    <span className="text-red-500 text-sm">{formErrors.phone}</span>
                  )}
                </div>
              </div>
              
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={customerDetails.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    formErrors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Address"
                />
                {formErrors.address && (
                  <span className="text-red-500 text-sm">{formErrors.address}</span>
                )}
              </div>
              
              {/* Payment Details */}
              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4">Payment Details</h3>
                <div className="space-y-3">
                  {/* UPI Payment */}
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="flex-1">Pay with UPI</span>
                    <div className="w-8 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      UPI
                    </div>
                  </label>
                  
                  {/* Net Banking */}
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="flex-1">Pay with Net Banking</span>
                    <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      NB
                    </div>
                  </label>
                  
                  {/* Card Payment */}
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="flex-1">Pay with Card</span>
                    <div className="w-8 h-6 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                  </label>
                </div>
                
                {formErrors.payment && (
                  <span className="text-red-500 text-sm">{formErrors.payment}</span>
                )}
              </div>
              
              {/* Pay Now Button */}
              <button
                onClick={handlePayNow}
                disabled={processing}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
