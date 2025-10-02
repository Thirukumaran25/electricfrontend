import React, { useEffect, useState } from "react";
import api,{ getemergencyimages } from "../api/api";

function Emergency() {
  const [aboutImages, setAboutImages] = useState([]);
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
    const fetchAboutImages = async () => {
      try {
        const data = await getemergencyimages();
        setAboutImages(data);
      } catch (error) {
        console.error("Error fetching about images:", error);
      }
    };

    fetchAboutImages();
  }, []);

  return (
    <div>
      <div>
        {aboutImages.length > 0 && (
          <div className="w-full h-96">
            <img
              className="w-full h-full object-cover shadow"
              src={aboutImages[0].image}
              alt={aboutImages[0]}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          {/* Left: Info Cards & Map */}
          <div className=" p-4">
              <h1 className="text-xl font-bold text-blue-900">Professional Emergency Electrician- Fast & Reliable</h1>
              <p className="py-4">24-hours Electrician in Electric dreams, Call Our Professional <br />
              Electricians Now To Get Help Fast</p>
              <p>⭐⭐⭐⭐⭐</p>
              <p>Over 215 google reviews</p>
              {aboutImages.length > 1 && (
          <div className="">
            <img
              className="w-50 h-50 object-cover shadow"
              src={aboutImages[1].image}
              alt={aboutImages[1]}
            />
          </div>
        )}
          </div>
          
          
          <form
            onSubmit={handleSubmit}
            className=" rounded-xl p-6 bg-blue-300 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="flex flex-col">
              <input
                id="firstname"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="border bg-white border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            <div className="flex flex-col">
              <input
                id="lastname"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last name"
                required
                className="border bg-white border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            {/* Mobile */}
            <div className="flex flex-col">
              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Phone number"
                required
                className="border bg-white border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>

            <div className="flex flex-col">
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email id"
                required
                className="border bg-white border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
            {/* Message (Spans two columns on small screens and up) */}
            <div className="flex flex-col sm:col-span-2">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help?"
                required
                className="border bg-white border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full min-h-[100px]" // Increased min-height slightly
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

      <div>
        {/* Why Choose Section */}
        <div className="w-full max-w-5xl mx-auto mb-12">
          <h3 className="text-2xl font-bold mb-8">
            Why choose our electrician?
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="border-2 border-orange-500 rounded-2xl flex flex-col items-center justify-center p-8 min-w-[180px] bg-white">
              <span className="mb-4 text-4xl">✔️</span>
              <div className="text-center font-medium">
                Lifetime
                <br />
                Workmanship
                <br />
                Warranty
              </div>
            </div>
            <div className="border-2 border-orange-500 rounded-2xl flex flex-col items-center justify-center p-8 min-w-[180px] bg-white">
              <span className="mb-4 text-4xl">🏅</span>
              <div className="text-center font-medium">
                Money Back
                <br />
                Guarantee
              </div>
            </div>
            <div className="border-2 border-orange-500 rounded-2xl flex flex-col items-center justify-center p-8 min-w-[180px] bg-white">
              <span className="mb-4 text-4xl">🚗</span>
              <div className="text-center font-medium">
                24/7 Emergency
                <br />
                Service
              </div>
            </div>
            <div className="border-2 border-orange-500 rounded-2xl flex flex-col items-center justify-center p-8 min-w-[180px] bg-white">
              <span className="mb-4 text-4xl">⭐</span>
              <div className="text-center font-medium">
                190+ 5-Star
                <br />
                Customer
                <br />
                Reviews
              </div>
            </div>
            <div className="border-2 border-orange-500 rounded-2xl flex flex-col items-center justify-center p-8 min-w-[180px] bg-white">
              <span className="mb-4 text-4xl">🎖️</span>
              <div className="text-center font-medium">
                Awarded For
                <br />
                Service
                <br />
                Excellence
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0056B3] flex justify-around my-5 text-white text-center">
          <div className="text-center">
            <h1 className="text-xl font-semibold p-2">
              Quality Workmanship
            </h1>
            <p className="my-10">
              Our Licensed Electricians are experienced in handling the <br />
              unique electrical demands of commercial properties, <br />
              from offices and retail spaces to restaurants and warehouses.
            </p>
            <button className="text-white bg-orange-600 font-bold rounded-full px-8 py-3 text-lg shadow-md">Call Now</button>
          </div>
          <div>
            {aboutImages.length > 2 && (
              <div className="w-full h-96">
                <img
                  className="w-full h-96"
                  src={aboutImages[2].image}
                  alt={aboutImages[2]}
                />
              </div>
            )}
          </div>
        </div>


            <div className="w-full max-w-5xl mx-auto bg-orange-500 rounded-2xl flex flex-col md:flex-row justify-between items-center px-8 py-8 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-0 text-center md:text-left">
            Get in Touch with Electric Dreams
            <br />
            Electrical Today
          </h2>
          <button className="bg-white text-orange-600 font-bold rounded-full px-8 py-3 text-lg shadow-md">
            Call(+91)1234567890
          </button>
        </div>
        {/* Info Section */}
        <div className="w-full max-w-4xl mx-auto bg-[#337acc] rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            Signs you need an emergency electrician
          </h3>
          <p className="text-white text-center mb-6">
            Many signs indicate when it’s time to call a 24 hour electrician for
            help with your electrical problems. Here’s a quick list of what to
            look for:
          </p>
          <ul className="text-white list-disc pl-6 space-y-4">
            <li>
              <span className="font-bold">
                Smoke coming out of your outlets
              </span>{" "}
              — Smoke from power outlets can signify that the wiring in your
              home or business is faulty and needs to be replaced. If you don’t
              have an after-hours electrician on hand to inspect the problem, it
              could cause a fire. If you see smoke or hear crackling sounds from
              an outlet, turn off the power at the breaker box and call an
              expert.
            </li>
            <li>
              <span className="font-bold">Smell of burning electronics</span> —
              When you suddenly smell burning electronics, something might be
              wrong with your electrical system. If the smell is strong and
              seems to be coming from more than one device in your home, it’s
              time to call an emergency electrician.
            </li>
            <li>
              <span className="font-bold">Sudden isolated loss of power</span> —
              If there is a sudden loss of power over a small area or within one
              room of your home, this could be due to a short circuit or blown
              fuse, or it could result from faulty wiring that needs to be
              repaired immediately.
            </li>
            <li>
              <span className="font-bold">
                Circuit breaker keeps tripping or resetting
              </span>{" "}
              — Circuit breakers are supposed to trip when they sense too much
              current, but if they trip too often, there might be something
              wrong with the wiring, or your breaker may be faulty.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Emergency;
