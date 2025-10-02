import React, { useState } from "react";
import api from "../api/api"; // Assuming this is configured correctly

function Contact() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    address: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const isSubmitting = status === "Sending..."; // Helper for button state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent resubmission

    setStatus("Sending...");

    try {
      const response = await api.post("/contactmessages/", formData);

      if (response.status === 201) {
        setStatus("Message sent successfully! 🎉");
        // Clear form after successful submission
        setFormData({
          firstname: "",
          lastname: "",
          mobile: "",
          email: "",
          address: "",
          message: "",
        });
        // Clear status message after a short delay
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

  return (
    <div className=" ">
      <div className="bg-[#337acc] p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
        <p className="mb-6 text-xl">We'd love to hear from you.</p>
      </div>
      <div className="w-full mx-auto bg-white flex flex-col rounded-t-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Info Cards & Map */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <div className="border-2 rounded-xl flex-1 flex flex-col items-center justify-center p-6">
                <span className="text-3xl mb-2">📞</span>
                <div className="font-medium mb-1">Call our Team</div>
                <div className="text-orange-600 font-bold">+91-1234567890</div>
              </div>
              <div className="border-2 rounded-xl flex-1 flex flex-col items-center justify-center p-6">
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
            <div className="border-2 rounded-xl overflow-hidden">
              <img
                src="https://maps.wikimedia.org/img/osm-intl,13,151.2093,-33.8688,600x300.png"
                alt="Map showing a location"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
          
          {/* Right: Contact Form - Using a 2-column grid inside the form */}
          <form
            onSubmit={handleSubmit}
            className="border-2 rounded-xl p-6 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Firstname */}
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
            {/* Lastname */}
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

export default Contact;