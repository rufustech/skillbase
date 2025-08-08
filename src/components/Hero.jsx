import { motion } from "framer-motion";
import { safety3d } from "../assets";

function Hero() {
  return (
    <div className="bg-gray-50">
      <div className="w-full container mx-auto h-auto">
        <section className="w-full h-auto flex flex-col lg:flex-row-reverse lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[50%] flex items-center justify-center overflow-hidden"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={safety3d}
              alt="Safety Helmet 3D"
              className="h-[] object-cover drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-auto lg:w-[50%] flex flex-col mt-5 md:mt-10 lg:mt-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-7xl font-semibold bg-gradient-to-r from-[#432010] to-yellow-700 bg-clip-text text-transparent px-2 pb-4 lg:px-0 text-center lg:text-left"
            >
              Skillbase: Safety and Compliance Training
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm lg:text-lg mt-5 mx-2 px-5 lg:px-0 text-center lg:text-left text-gray-600"
            >
              Welcome to Skillbase - your comprehensive platform for workplace
              safety training and compliance. We equip teams with essential
              skills for a safer work environment.
            </motion.p>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/login"
              className="h-16 w-60 bg-gradient-to-r from-[#432010] to-yellow-700 flex items-center justify-start rounded-full mt-5 p-1.5 mx-5 hover:opacity-90 transition shadow-lg"
            >
              <span className="flex flex-1 items-center justify-center text-white text-lg font-bold">
                Begin your training
              </span>
              <motion.div
                whileHover={{ rotate: 0 }}
                className="h-9 w-9 bg-white rounded-full flex items-center justify-center -rotate-45"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </motion.div>
            </motion.a>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-start gap-5 lg:gap-12 h-28 mt-5 z-10"
            >
              {[
                { number: "1K", label: "Safety" },
                { number: "2K", label: "Compliance" },
                { number: "3K", label: "Certifications" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center font-bold p-5 shadow-lg rounded-lg bg-white hover:bg-gradient-to-b hover:from-white hover:to-gray-50 transition-all duration-300"
                >
                  <p className="text-3xl lg:text-5xl">
                    {item.number}
                    <span className="text-yellow-700">+</span>
                  </p>
                  <p>{item.label}</p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default Hero;
