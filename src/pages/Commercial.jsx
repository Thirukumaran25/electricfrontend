import React, { useEffect, useState } from "react";
import api,{ getserviceimages,} from "../api/api";
import { Link } from "react-router-dom";


function Commercial() {
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    address: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const isSubmitting = status === "Sending...";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setStatus("Sending...");

    try {
      const response = await api.post("/contactmessages/", formData);

      if (response.status === 201) {
        setStatus("Message sent successfully! 🎉");
        setFormData({
          firstname: "",
          lastname: "",
          mobile: "",
          email: "",
          address: "",
          message: "",
        });
        setTimeout(() => setStatus(""), 5000);
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );
      setStatus("Failed to send message. Please try again. 😔");
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getserviceimages();
        setImages(data);
      } catch (error) {
        console.error("Error fetching service images:", error);
      }
    };

    fetchImages();
    const fetchServices = async () => {
      try {
        const response = await api.get("/commercialservicelists/");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching commercial services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <div className="bg-[#0056B3] flex justify-around items-center my-5 text-white text-center">
        <div>
            <h1 className="text-3xl font-semibold pb-10">Commercial Services</h1>
            <p>Our Licensed Electricians are experienced in handling the <br />
            unique electrical demands of commercial properties, <br />
            from offices and retail spaces to restaurants and warehouses.</p>
        </div>
        <div>
          {images.length > 0 && (
            <div className="w-64 h-64 overflow-hidden rounded-full">
              <img className="shadow" src={images[0].image} alt={images[0]} />
            </div>
          )}
        </div>
      </div>

      {/* Commercial Service Cards Section */}
      <div className="w-full flex flex-col items-center py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {services.map((service) => (
          <Link key={service.id} to="/commercialproduct">
            <div key={service.id} className="rounded-3xl overflow-hidden shadow-lg bg-white flex flex-col">
              <img src={service.image} alt={service.title} className="h-72 w-full object-cover" />
              <div className="bg-[#1064b0] p-6 flex flex-1">
                <div>
                <h2 className="text-white text-2xl font-bold mb-2">{service.title}</h2>
                <p className="text-white text-base mb-4">{service.description}</p>
                </div>
                <div className="flex h-12 justify-end">
                  <span className="bg-white border rounded-full p-2">
                    <svg width="32" height="32" fill="none" stroke="#1064b0" strokeWidth="3" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" stroke="#1064b0" strokeWidth="2" fill="none"/><path d="M10 8l4 4-4 4" stroke="#1064b0" strokeWidth="2" fill="none"/></svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div>

      <div className="w-full mx-auto bg-amber-700 flex flex-col rounded-t-2xl p-8 mb-15">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Info Cards & Map */}
          <div className="">
              <div className="text-white py-4 text-2xl">
                <h1>Get in Touch</h1>
                <p>Contact Electric Dreams</p>
              </div>
            
              <div className="bg-white rounded-xl flex-1 flex flex-col items-center justify-center">
                <span className="text-3xl mb-2">📞</span>
                <div className="font-medium mb-1">Call our Team</div>
                <div className="text-orange-600 font-bold">+91-1234567890</div>
              </div>
              <div className="bg-white rounded-xl flex-1 my-5 flex flex-col items-center justify-center">
                <span className="text-3xl mb-2">✉️</span>
                <div className="font-medium mb-1 text-center">
                  Reach out to us
                  <br />
                  Send email
                </div>
                <div className="text-orange-600 font-bold text-center break-all">
                  support@electricdreams.com
                </div>
              </div>
            
          </div>
          
          
          <form
            onSubmit={handleSubmit}
            className=" rounded-xl p-6 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="flex flex-col">
              <label htmlFor="firstname" className="font-medium mb-1 text-gray-700">Firstname</label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname" className="font-medium mb-1 text-gray-700">Lastname</label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last name"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            {/* Mobile */}
            <div className="flex flex-col">
              <label htmlFor="mobile" className="font-medium mb-1 text-gray-700">Mobile</label>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Phone number"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium mb-1 text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email id"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            {/* Address (Spans two columns on small screens and up) */}
            <div className="flex flex-col sm:col-span-2">
              <label htmlFor="address" className="font-medium mb-1 text-gray-700">
                Address <span className="text-sm font-normal text-gray-500">(Optional)</span>
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
                className="border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            {/* Message (Spans two columns on small screens and up) */}
            <div className="flex flex-col sm:col-span-2">
              <label htmlFor="message" className="font-medium mb-1 text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help?"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full min-h-[100px]" // Increased min-height slightly
              />
            </div>

            {/* Submit Button and Status (Spans two columns) */}
            <div className="sm:col-span-2 flex flex-col items-end">
                <button
                type="submit"
                className={`font-bold rounded-full px-8 py-3 mt-2 transition-colors ${
                    isSubmitting
                    ? "bg-gray-400 cursor-not-allowed text-gray-700"
                    : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
                }`}
                disabled={isSubmitting}
                >
                {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                <p 
                    className={`text-sm mt-2 font-medium ${
                        status.includes("successfully") ? "text-green-600" : status.includes("Failed") ? "text-red-600" : "text-gray-600"
                    }`}
                >
                    {status}
                </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Commercial;
