import { Link } from "react-router-dom";
import facebookLogo from "../assets/facebooklogo.png";
import instagramLogo from "../assets/instagramlogo.png";
import twitterLogo from "../assets/linkedlogo.png";

const Footer = () => {
  return (
    <footer className="text-justify bg-[#290040] text-white py-10 px-8 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tentang Kami */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">About GIS</h3>
            <p className="text-sm mb-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam placeat laboriosam earum cumque quidem odit. Sunt fuga alias quo, in laudantium at non accusamus reiciendis ut, sapiente necessitatibus, fugit similique!
            </p>
          </div>

          {/* Layanan Kami */}
          <div className="pl-4">
            <h3 className="text-2xl font-semibold mb-4">GIS Competition</h3>
            <ul className="space-y-1">
              {[
                { name: "Karya Tulis Ilmiah", icon: "📄" },
                { name: "Olimpiade CBT", icon: "🏆" },
              ].map((service, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-lg">{service.icon}</span>
                  <a
                    href="#"
                    className="ml-3 hover:text-[#6eacda] transition duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-1">
              <li className="flex items-center">
                <span className="text-lg">✉</span>
                <a
                  href="mailto:gis@gmail.com"
                  className="ml-3 hover:text-[#6eacda] transition duration-300"
                >
                  gis@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-lg">📞</span>
                <a
                  href="tel:+6281234567890"
                  className="ml-3 hover:text-[#6eacda] transition duration-300"
                >
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-lg">📍</span>
                <p className="ml-3">Jalan Kreatif No. 123, Jakarta</p>
              </li>
            </ul>
          </div>

          {/* Berlangganan */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact us</h3>
            <p className="text-sm mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum! Quod, cumque.
            </p>
            <div className="flex space-x-2">
              <Link to="/Pemesanan">
                <button className="bg-[#512DA8] hover:bg-[#e2e2b6] text-white font-bold py-2 px-10 rounded-full transition duration-300">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 my-8"></div>

        {/* Sosial Media Paling Bawah - Center */}
        <div className="w-full flex justify-center mt-4">
          <ul className="flex space-x-6 items-center">
            {[
              {
                name: "Facebook",
                icon: facebookLogo,
                url: "https://facebook.com",
              },
              {
                name: "Instagram",
                icon: instagramLogo,
                url: "https://instagram.com",
              },
              {
                name: "Twitter",
                icon: twitterLogo,
                url: "https://twitter.com",
              },
            ].map((social, index) => (
              <li key={index}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition duration-300"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-8 h-8"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
