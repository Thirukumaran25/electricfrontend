import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { addToCart } from "../api/api";

function ComProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/commercialserviceproducts/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);
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
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-2">
      <h1 className="text-3xl lg:mx-20 font-bold mb-8">Lighting Installation</h1>
      <div className="border-2 lg:mx-20 rounded-3xl flex flex-col md:flex-row items-center p-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-38 h-38 object-contain bg-gray-100 rounded-xl"
        />
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <div className="text-lg">
            {product.rating} ({product.reviews} reviews)
          </div>
          <div className="text-lg">₹{product.price}</div>
          <div className="text-lg">{product.duration}</div>
          <div className="text-lg">{product.time} min</div>
          <div className="text-lg">₹20 off 2nd time onwards</div>
          {product.offer && <div className="text-lg">{product.offer}</div>}
        </div>
        <div className="flex flex-col gap-6 items-center md:items-end">
          <button 
            className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-10 py-4 text-lg font-semibold transition-colors"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-4 text-lg font-semibold transition-colors">
            Call (+91)1234567890
          </button>
        </div>
      </div>

      {/* Our Process & Top Technicians Section */}
      <div className="w-full mx-auto flex flex-col md:flex-row gap-8 rounded-2xl p-4 my-5 text-white">
        <div className="flex-1 bg-blue-600 p-4">
          <h2 className="text-2xl font-bold mb-6">Our Process</h2>
          <div className="flex flex-col gap-2">
            {[{
              step: 1,
              title: "Inspection",
              desc: "We will check the space where you want to install the holder"
            }, {
              step: 2,
              title: "Installation",
              desc: "We will install the holder with care"
            }, {
              step: 3,
              title: "Cleanup",
              desc: "We will clean the area once work is done"
            }, {
              step: 4,
              title: "Warranty activation",
              desc: "The service is covered by a 30-day warranty for any issues after installation"
            }].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-xl font-bold">{p.step}</div>
                <div>
                  <div className="font-bold text-lg">{p.title}</div>
                  <div className="text-base">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-blue-600 flex flex-col gap-2 items-center justify-center">
          <h2 className="text-2xl font-bold mb-6">Top technicians</h2>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              <span className="text-base">Background verified</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔧</span>
              <span className="text-base">Trained across all major brands</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎓</span>
              <span className="text-base">Certified under skill india programme</span>
            </div>
          </div>
        </div>
      </div>




      <div className="w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h2>
        <p className="text-lg text-center mb-8 text-gray-700">Everything you need to know about our services.</p>
        <div className="flex flex-col gap-6">
          {[
            {
              q: "Did you charge call-out fee?",
              a: "No! We offer a $0 callout fee During Business Hours, so you only pay for the work we do—no hidden costs or surprises."
            },
            {
              q: "Do you offer emergency electrical services?",
              a: "Yes! We provide 24/7 emergency electrical repairs, ensuring you get fast and reliable service when you need it most."
            },
            {
              q: "Do you work with business and commercial properties?",
              a: "Yes! We provide comprehensive commercial electrical services, including office fit-outs, lighting upgrades, and compliance testing."
            },
            {
              q: "Are you licensed and insured?",
              a: "Yes! Voltaic Electrical is fully licensed and insured, ensuring all work meets Australian safety standards."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mx-auto p-8 mt-16">
        <h2 className="text-xl font-bold text-cente py-5">What Our Happy Customers Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Testimonials */}
          {[{
            name: "Stephen Watts",
            job: "Private Power Pole Installation",
            review: "Had my private power pole replaced, they did an exceptional job. Competitive pricing, was well below the other quotes I got for the job, Great service!"
          }, {
            name: "Dean McKenzie",
            job: "Outdoor Lighting",
            review: "Connor was very diligent in troubleshooting our outdoor low voltage lighting. No problem now, all resolved by Connor, he's a good troubleshooter."
          }, {
            name: "Daniel Pollifrone",
            job: "Lighting & Ceiling Fans",
            review: "Connor and the team done an exceptional job at our property on a number of electrical tasks including the installation of downlights and ceiling fans."
          }, {
            name: "Dean Orchard",
            job: "Emergency Call-Out",
            review: "Had my power short out, called after hours, they came out within the hour and had my power back up in no time! Reasonable pricing and knowledgeable tradesman. Great job mate."
          }].map((t, i) => (
            <div key={i} className="bg-white rounded-2xl border shadow p-2 flex flex-col items-start">
              <div className="flex gap-1 mb-2 text-yellow-500 text-xl">{'★'.repeat(5)}</div>
              <p className="mb-4 text-gray-800 text-sm">{t.review}</p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="inline-block w-8 h-8 rounded-full bg-gray-300"></span>
                <div>
                  <span className="font-bold">{t.name}</span><br />
                  <span className="text-sm font-semibold text-gray-700">{t.job}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComProductDetail;
