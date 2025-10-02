import React, { useEffect, useState } from "react";
import { getcommercialserviceproducts, addToCart } from "../api/api";
import { Link } from "react-router-dom";

function CommercialProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getcommercialserviceproducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching commercial service products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart successfully!");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Please log in to add items to cart.");
      } else {
        alert("Failed to add to cart. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-10">
      <div className="w-full max-w-7xl mx-auto bg-orange-500 rounded-2xl text-center px-8 py-8 my-5">
        <h2 className="text-xl text-center font-bold text-white">
          Lighting Installation <span className="text-2xl">Book Online or Call to book your service</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="border-2 border-black rounded-3xl p-6 flex flex-row justify-between items-center bg-white"
          >
            <div className="flex flex-col gap-2 flex-1">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <span className="text-xl">★</span>
                <span>
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <div className="text-lg mt-1">
                ₹{product.price}{" "}
                <span className="text-blue-700">• {product.duration}</span>
              </div>
              <Link
                to={`/commercialproduct/${product.id}`}
                className="text-orange-600 font-bold mt-2"
              >
                View Details
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-contain mb-2"
              />
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-1 font-semibold transition-colors"
                onClick={() => handleAddToCart(product.id)}
              >
                Add
              </button>
            </div>
          </div>
        ))}

        
      </div>
      <div className="w-full max-w-7xl mx-auto bg-orange-500 rounded-2xl flex flex-col md:flex-row justify-between items-center px-8 py-8 my-12">
        <h2 className="text-2xl md:text-2xl text-center font-bold text-white mb-6 md:mb-0 md:text-left">
          Get in Touch with Electric Dreams <br /> Electrical Today
        </h2>
        <button className="bg-white text-orange-600 font-bold rounded-full px-8 py-3 text-lg shadow-md">
          Call (+91) 1234567890
        </button>
      </div>
    </div>
  );
}

export default CommercialProduct;
