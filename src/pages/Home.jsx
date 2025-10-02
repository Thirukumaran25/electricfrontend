import React, { useEffect, useState } from "react";
import api, { gethomeimage } from "../api/api";
import { Link } from "react-router-dom";

function Home() {
  const [images, setImages] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await gethomeimage();
        setImages(data);
      } catch (error) {
        console.error("Error fetching service images:", error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
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

  // ✅ Carousel logic
  const itemWidth = 136;
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  const allServices = [...services, ...services, ...services];

  useEffect(() => {
    if (services.length > 0) {
      setIndex(services.length); // Start in the middle
    }
  }, [services]);

  useEffect(() => {
    if (services.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
      setTransition(true);
    }, 1000);

    return () => clearInterval(interval);
  }, [services]);

  useEffect(() => {
    if (services.length === 0) return;

    if (index === services.length * 2) {
      const timeout = setTimeout(() => {
        setTransition(false);
        setIndex(services.length);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [index, services.length]);

  const translateX = -index * itemWidth;

  return (
    <div className="flex flex-col items-center py-12 px-2">
      <div className="relative">
        {images.length > 0 && (
          <div className="w-full relative h-96">
            <img
              className="w-full h-96 shadow bg-blue-700 object-cover"
              src={images[0].image}
              alt="Hero"
            />
          </div>
        )}

        <div className="absolute bg-black lg:left-1/2 lg:top-2/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4 w-full max-w-2xl">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
            Your Trusted Experts for All Things Electrical
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg">
            From residential upgrades to large-scale commercial projects, we
            deliver expert service, quality workmanship, and reliable results.
          </p>
        </div>
      </div>

      {/* Services Title */}
      <h1 className="text-center text-3xl font-bold mt-12 mb-6">
        Our Services
      </h1>

      {/* ✅ Carousel */}
      <div className="overflow-hidden mx-auto">
        <div
          className="flex"
          style={{
            width: `${allServices.length * itemWidth}px`,
            transform: `translateX(${translateX}px)`,
            transition: transition ? "transform 0.1s ease-in" : "none",
          }}
        >
          {allServices.map((service, idx) => (
            <div
              key={`${service.id}-${idx}`}
              className="min-w-[300px] mx-3 rounded-3xl overflow-hidden shadow-lg bg-[#1064b0] flex flex-col p-4"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-72 w-full object-cover"
              />
              <div className="bg-[#1064b0] p-6 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-white text-2xl font-bold mb-2">
                    {service.title}
                  </h2>
                  <p className="text-white text-base mb-4">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="bg-amber-600 p-2 my-5 text-2xl font-bold text-white rounded-full">
        <Link to="/commercialproduct"></Link>Our Services
      </button>
      <h1 className="text-center text-xl font-bold text-orange-400 my-4">
        Why Choose us?
      </h1>
      {/* Team & Experience Section */}
      <div className="w-full bg-blue-900 ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center px-4">
          <div className="grid grid-cols-2 md:w-1/2">
            {images.length > 1 && (
              <div className="w-full relative h-64">
                <img
                  className=" object-cover w-full h-64"
                  src={images[1].image}
                  alt="Hero"
                />
              </div>
            )}
            {images.length > 2 && (
              <div className="w-full relative h-64">
                <img
                  className=" object-cover w-full h-64"
                  src={images[2].image}
                  alt="Hero"
                />
              </div>
            )}
            {images.length > 3 && (
              <div className="w-full relative h-64">
                <img
                  className=" object-cover w-full h-64"
                  src={images[3].image}
                  alt="Hero"
                />
              </div>
            )}
            {images.length > 4 && (
              <div className="w-full relative h-64">
                <img
                  className=" object-cover w-full h-64"
                  src={images[4].image}
                  alt="Hero"
                />
              </div>
            )}
          </div>
          <div className="md:w-1/2 flex flex-col gap-8">
            <h2 className="text-md font-bold text-white ">
              Our team is fully licensed and accredited, bringing extensive
              experience and recognised qualifications in electrical, solar, air
              conditioning, and more.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-2 flex flex-col items-start">
                <div className="text-4xl mb-2">🔌</div>
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="font-bold mb-1">
                  Years of Industry Experience
                </div>
                <div className="text-gray-700">
                  Combining decades of expertise to provide reliable, effective
                  electrical solutions.
                </div>
              </div>
              <div className="bg-white rounded-xl p-2 flex flex-col items-start">
                <div className="text-4xl mb-2">🔧</div>
                <div className="text-3xl font-bold mb-1">5000+</div>
                <div className="font-bold mb-1">Projects Completed</div>
                <div className="text-gray-700">
                  Reflecting the trust businesses and home owners place in us
                  for ongoing electrical services.
                </div>
              </div>
              <div className="bg-white rounded-xl p-2 flex flex-col items-start">
                <div className="text-4xl mb-2">👍</div>
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="font-bold mb-1">First-Time Fix Rate</div>
                <div className="text-gray-700">
                  Proving our efficiency in diagnosing and resolving electrical
                  issues on the first visit.
                </div>
              </div>
              <div className="bg-white rounded-xl p-2 flex flex-col items-start">
                <div className="text-4xl mb-2">💲</div>
                <div className="text-3xl font-bold mb-1">10M</div>
                <div className="font-bold mb-1">Client Energy Savings</div>
                <div className="text-gray-700">
                  Estimating the financial impact our solutions have had in
                  reducing energy costs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full mx-auto bg-blue-900 p-8 mt-16">
        <h2 className="text-2xl font-bold text-center text-white">
          What Our Happy Customers Are Saying
        </h2>
        <p className="text-lg text-center mb-10 text-white bg-blue-900 py-2 rounded">
          Discover why our clients trust us to keep their homes and businesses
          spotless.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Testimonials */}
          {[
            {
              name: "Stephen Watts",
              job: "Private Power Pole Installation",
              review:
                "Had my private power pole replaced, they did an exceptional job. Competitive pricing, was well below the other quotes I got for the job, Great service!",
            },
            {
              name: "Dean McKenzie",
              job: "Outdoor Lighting",
              review:
                "Connor was very diligent in troubleshooting our outdoor low voltage lighting. No problem now, all resolved by Connor, he's a good troubleshooter.",
            },
            {
              name: "Daniel Pollifrone",
              job: "Lighting & Ceiling Fans",
              review:
                "Connor and the team done an exceptional job at our property on a number of electrical tasks including the installation of downlights and ceiling fans.",
            },
            {
              name: "Dean Orchard",
              job: "Emergency Call-Out",
              review:
                "Had my power short out, called after hours, they came out within the hour and had my power back up in no time! Reasonable pricing and knowledgeable tradesman. Great job mate.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-2 flex flex-col items-start"
            >
              <div className="flex gap-1 mb-2 text-yellow-500 text-xl">
                {"★".repeat(5)}
              </div>
              <p className="mb-4 text-gray-800 text-sm">{t.review}</p>
              <div className="flex items-center gap-2 mt-auto">
                <span className="inline-block w-8 h-8 rounded-full bg-gray-300"></span>
                <div>
                  <span className="font-bold">{t.name}</span>
                  <br />
                  <span className="text-sm font-semibold text-gray-700">
                    {t.job}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Process */}
      <h2 className="text-3xl font-bold mt-16 mb-10 text-center">
        Our Proven Three Step Process
      </h2>
      <div className="w-full flex flex-col md:flex-row justify-center gap-8 mb-16">
        {[
          {
            step: 1,
            title: "Consultation & Assessment",
            desc: "We begin by understanding your specific needs and goals. Our experts conduct a thorough assessment to recommend the best electrical solutions tailored to your requirements.",
          },
          {
            step: 2,
            title: "Detailed Quote",
            desc: "After assessing your needs, we provide a clear, detailed proposal outlining the recommended approach, estimated timelines, and costs, so you know exactly what to expect.",
          },
          {
            step: 3,
            title: "Installation & Support",
            desc: "Our certified team completes your project with precision and efficiency, keeping you informed every step of the way. After installation, we provide guidance and ongoing support.",
          },
        ].map((step, i) => (
          <div
            key={i}
            className="border-4 border-orange-500 p-8 flex-1 min-w-[280px] max-w-[400px] bg-white"
          >
            <div className="text-5xl font-bold text-center mb-2">
              {step.step}
            </div>
            <h3 className="text-xl font-bold mb-4 text-center md:text-left">
              {step.title}
            </h3>
            <p className="text-base text-gray-700">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="w-full max-w-7xl mx-auto bg-orange-500 rounded-2xl flex flex-col md:flex-row justify-between items-center px-8 py-8 mb-12">
        <h2 className="text-2xl md:text-2xl text-center font-bold text-white mb-6 md:mb-0 md:text-left">
          Get in Touch with Electric Dreams <br /> Electrical Today
        </h2>
        <button className="bg-white text-orange-600 font-bold rounded-full px-8 py-3 text-lg shadow-md">
          Call (+91) 1234567890
        </button>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-center mb-8 text-gray-700">
          Everything you need to know about our services.
        </p>
        <div className="flex flex-col gap-6">
          {[
            {
              q: "Did you charge call-out fee?",
              a: "No! We offer a $0 callout fee During Business Hours, so you only pay for the work we do—no hidden costs or surprises.",
            },
            {
              q: "Do you offer emergency electrical services?",
              a: "Yes! We provide 24/7 emergency electrical repairs, ensuring you get fast and reliable service when you need it most.",
            },
            {
              q: "Do you work with business and commercial properties?",
              a: "Yes! We provide comprehensive commercial electrical services, including office fit-outs, lighting upgrades, and compliance testing.",
            },
            {
              q: "Are you licensed and insured?",
              a: "Yes! Voltaic Electrical is fully licensed and insured, ensuring all work meets Australian safety standards.",
            },
          ].map((faq, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
