import React, { useEffect, useState } from "react";
import { getaboutimages } from "../api/api";

function About() {
   const [aboutImages, setAboutImages] = useState([]);
  
    useEffect(() => {
      const fetchAboutImages = async () => {
        try {
          const data = await getaboutimages();
          setAboutImages(data);
        } catch (error) {
          console.error("Error fetching about images:", error);
        }
      };
  
      fetchAboutImages();
    }, []);
  return (
    <div className="mx-10">
      <h1 className="text-2xl my-4 font-bold text-amber-600">About Electric Dreams</h1>
      <p className="text-xl">We are here to provide tailored solutions that <br />
      meet your unique electrical needs.</p>
      <div className=" flex justify-around my-5 text-white gap-4">
        <div className="w-1/2">
          {aboutImages.length > 0 && (
            <div className=" h-full overflow-hidden ">
              <img className="shadow" src={aboutImages[0].image} alt={aboutImages[0]} />
            </div>
          )}
        </div>
        <div className="w-1/2 text-black">
            <h2 class="text-2xl font-bold mb-4">Who we are ?</h2>
          <p class="mb-4">
            Electric Dreams Group was founded with a passion for powering the community responsibly.
            We are a team of licensed Master Electricians and certified specialists in solar, air conditioning,
            and thermal imaging, dedicated to delivering the highest standard of service.
          </p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Electrical Contractors License: 12356</li>
            <li>Solar Accreditation Australia: S7638297</li>
            <li>Refrigeration License: L109876</li>
            <li>Communication License: T37634</li>
            <li>Cat 1 Vibration Analysis</li>
            <li>Cat 1 Infrared Thermal Imaging</li>
            <li>Member of Master Electricians</li>
          </ul>
        </div>
      </div>

      <div className=" flex justify-around items-center my-5 text-white text-center">
        <div className="w-1/2 text-black">
            <h2 class="text-2xl font-bold mb-4">Our Services</h2>
          <p>
            Our comprehensive range of services is designed to address a wide variety of energy needs across
            residential, commercial, and industrial sectors. From electrical installations and solar systems
            to EV charging stations, thermal imaging, and industrial lighting, our goal is to offer solutions
            that not only meet immediate requirements but also support long-term sustainability.
          </p>
          <p class="mt-4">
            We work with leading brands like Clipsal, Tesla, and Solar Edge to ensure our clients receive
            the best products on the market. Whether you're looking to save on energy costs, reduce environmental
            impact, or enhance your property’s value, we have the expertise and tools to make it happen.
          </p>
        </div>
        <div className="w-1/2">
          {aboutImages.length > 1 && (
            <div className="w-full h-64 overflow-hidden ">
              <img className="shadow" src={aboutImages[1].image} alt={aboutImages[1]} />
            </div>
          )}
        </div>
      </div>
       <div className=" flex justify-around items-center my-5 text-white text-center">
        <div className="w-1/2">
          {aboutImages.length > 2 && (
            <div className="w-full h-64 overflow-hidden">
              <img className="shadow" src={aboutImages[2].image} alt={aboutImages[2]} />
            </div>
          )}
        </div>
        <div className="w-1/2 text-black">
            <h2 class="text-2xl font-bold mb-4">Our Commitment to You</h2>
          <p>
            At Electric Dreams Solutions Group, client satisfaction isn’t just a goal; it’s the foundation of our business.
            We’re committed to transparent communication, exceptional customer service, and craftsmanship that lasts.
            From the initial consultation to project completion, we keep our clients informed every step of the way,
            ensuring their questions are answered, timelines are clear, and expectations are met.
          </p>
          <p class="mt-4">
            Our reputation is built on trust and quality, and we take pride in every project we undertake, no matter the size.
          </p>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto bg-orange-500 rounded-2xl flex flex-col md:flex-row justify-between items-center px-8 py-8 mb-12">
        <h2 className="text-2xl md:text-2xl text-center font-bold text-white mb-6 md:mb-0 md:text-left">
          Get in Touch with Electric Dreams <br /> Electrical Today
        </h2>
        <button className="bg-white text-orange-600 font-bold rounded-full px-8 py-3 text-lg shadow-md">
          Call (+91) 1234567890
        </button>
      </div>
    </div>
  )
}

export default About
