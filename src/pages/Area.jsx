import React from "react";

function Area() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-12 px-2 bg-white">
      <h2 className="text-3xl font-bold text-center mb-2 text-orange-600">
        Areas we services
      </h2>
      <p className="text-lg text-center mb-8 text-gray-700 max-w-2xl">
        Below are some areas we provide electrical services to. But, don’t worry
        if your area is not listed, we likely service your area too!
      </p>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[
          "Ariyalur",
          "Chengalpattu",
          "Chennai",
          "Coimbatore",
          "Cuddalore",
          "Dharmapuri",
          "Dindigul",
          "Erode",
          "Kallakurichi",
          "Kancheepuram",
          "Kanniyakumari",
          "Karur",
          "Krishnagiri",
          "Madurai",
          "Mayiladuthurai",
          "Nagapattinam",
          "Namakkal",
          "Nilgiris",
          "Perambalur",
          "Pudukkottai",
          "Ramanathapuram",
          "Ranipet",
          "Salem",
          "Sivaganga",
          "Tenkasi",
          "Thanjavur",
          "Theni",
          "Thoothukudi",
          "Tiruchirappalli",
          "Tirunelveli",
          "Tirupathur",
          "Tiruppur",
          "Tiruvallur",
          "Tiruvannamalai",
          "Tiruvarur",
          "Vellore",
          "Viluppuram",
          "Virudhunagar",
        ].map((area) => (
          <div
            key={area}
            className="bg-gray-100 rounded-lg py-3 px-2 text-center font-semibold text-gray-800 shadow"
          >
            {area}
          </div>
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto bg-orange-500 rounded-2xl flex flex-col md:flex-row justify-between items-center px-8 py-8 m-12">
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

export default Area;
