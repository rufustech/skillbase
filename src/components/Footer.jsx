import { motion } from "framer-motion";
import { safetyhelmets } from "../assets";

const currentYear = new Date().getFullYear();

function Footer() {
  const footerLinks = {
    Company: ["About", "Careers", "Press", "News"],
    Legal: ["Privacy Policy", "Terms of Service", "Licensing", "Cookie Policy"],
    Support: ["Contact", "Help Center", "Safety Center", "Community"],
    Resources: ["Blog", "Certifications", "Partners", "Training Materials"],
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-b from-gray-50 to-gray-100 bottom-0 rounded-lg shadow-lg z-50"
    >
      <div className="w-full max-w-7xl mx-auto py-1 sm:px-6 lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4 sm:px-6 lg:px-8">
          {/* Logo and Company Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <a
              href="https://skillbase.ca/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={safetyhelmets}
                className="h-16"
                alt="Skillbase Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-[#432010] to-yellow-700 bg-clip-text text-transparent">
                Skillbase
              </span>
            </a>
            <p className="mt-4 text-sm text-gray-600">
              Empowering workplaces through comprehensive safety and compliance
              training.
            </p>
          </motion.div>

          {/* Footer Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              className="lg:col-span-1"
            >
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <motion.li
                    key={link}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-[#432010] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.hr
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5 }}
          className="my-8 border-gray-200"
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-0 md:space-y-0">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-gray-500"
          >
            © {currentYear}{" "}
            <a
              href="https://www.rufarodev.com/"
              className="hover:text-[#432010] transition-colors duration-200"
            >
              Rufaro Mucheri
            </a>
            . All Rights Reserved. Skillbase™
          </motion.span>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex space-x-6"
          >
            {["Twitter", "LinkedIn", "GitHub", "Instagram"].map((social) => (
              <motion.a
                key={social}
                whileHover={{ y: -2 }}
                href="#"
                className="text-gray-400 hover:text-[#432010] transition-colors duration-200"
              >
                <span className="sr-only">{social}</span>
                {/* You can add social media icons here */}
                <span className="text-sm">{social}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
