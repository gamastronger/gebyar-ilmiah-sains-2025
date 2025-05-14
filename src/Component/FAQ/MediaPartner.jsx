import React from "react";

// Import 15 logo media partner dari folder assets
import media1 from "../../assets/gimage.jpeg";
import media2 from "../../assets/gimage.jpeg";
import media3 from "../../assets/gimage.jpeg";
import media4 from "../../assets/gimage.jpeg";
import media5 from "../../assets/gimage.jpeg";
import media6 from "../../assets/gimage.jpeg";
import media7 from "../../assets/gimage.jpeg";
import media8 from "../../assets/gimage.jpeg";
import media9 from "../../assets/gimage.jpeg";
import media10 from "../../assets/gimage.jpeg";
import media11 from "../../assets/gimage.jpeg";
import media12 from "../../assets/gimage.jpeg";
import media13 from "../../assets/gimage.jpeg";
import media14 from "../../assets/gimage.jpeg";
import media15 from "../../assets/gimage.jpeg";


const logos = [
  media1, media2, media3, media4, media5,
  media6, media7, media8, media9, media10,
  media11, media12, media13, media14, media15
];

const MediaPartner = () => {
  return (
    <section className="bg-purple-1000 py-10 rounded-xl ">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Media Partner
      </h2>

      <div className="overflow-hidden relative">
        <div className="mt-4 flex animate-scrollRight whitespace-nowrap">
          {[...logos, ...logos].map((logo, index) => (
            <div
            key={index}
            className="mx-3 bg-white p-20 rounded-md shadow-md flex items-center justify-center w-24 h-24 transition-all hover:scale-105 hover:shadow-lg"
          >
            <img
              src={logo}
              alt={`media-${index}`}
              className="object-contain w-full h-full"
            />
          </div>
          
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaPartner;
