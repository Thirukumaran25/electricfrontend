import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getcarts, updateCartItem, removeFromCart } from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartContentRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        setError(null);
        const data = await getcarts();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to load cart. Please make sure you're logged in.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [isAuthenticated, navigate]);

  const handleQuantityChange = async (id, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartItem(id, newQty);
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Failed to update quantity. Please try again.");
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await removeFromCart(id);
      setCartItems((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item. Please try again.");
    }
  };

  const handleBookNow = () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty. Add items before proceeding to checkout.");
      return;
    }
    navigate('/checkout'); // Navigate to checkout page
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  
  const minOfferAmount = 200;
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.product_price || item.price || 0) * item.quantity,
    0
  );
  const offerThreshold = minOfferAmount - totalAmount;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-500 text-xl mb-4">Your cart is empty</div>
            <button
              onClick={() => navigate('/commercialproduct')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.product_title || item.title}</h3>
                      <p className="text-gray-600 mb-4">
                        Price: ₹{item.product_price || item.price || 0} per service
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-700">Quantity:</span>
                        <div className="flex items-center border rounded-lg">
                          <button
                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                          <button
                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-lg font-semibold text-orange-600">
                        Total: ₹{((item.product_price || item.price || 0) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  
                  {totalAmount < minOfferAmount && (
                    <div className="flex justify-between text-orange-600">
                      <span>Visitation fees</span>
                      <span>₹60</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{(totalAmount + (totalAmount < minOfferAmount ? 60 : 0)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {totalAmount < minOfferAmount && (
                  <div className="bg-orange-100 text-orange-700 p-3 rounded-lg mb-4 text-sm">
                    Add ₹{offerThreshold.toFixed(2)} more to save ₹60 on visitation fees
                  </div>
                )}

                <button 
                  onClick={handleBookNow}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-bold text-lg transition-colors mb-4"
                >
                  Proceed to Checkout
                </button>

                <div className="border rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎫</span>
                    <span className="font-semibold">Get visitation fees offer</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">On orders above ₹200</div>
                  <button className="text-orange-600 font-semibold hover:text-orange-800 text-sm">
                    View more offers
                  </button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="font-bold mb-2">UC Promise</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Verified professionals
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Hassle free booking
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Transparent pricing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;