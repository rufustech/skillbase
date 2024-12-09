

function DashMainSection() {
  return (
    <div className="p-4 sm:ml-64 container mx-auto z-50">
       <div className="p-4 shadow shadow-lg rounded-lg dark:border-gray-700">
      <section className="relative w-full h-full min-h-screen bg-grey-100 ">
        <div className="hidden absolute z-20 left-0 top-12 w-full h-auto bg-white/90  px-4 py-2  flex-col md:flex-row">
          <button
            className="uppercase text-gray-800 text-xs lg:text-sm font-bold focus:bg-pink-300
           hover:bg-pink-300 px-2 h-full py-1 rounded transition-all duration-300"
          >
            Home
          </button>
          <button
            className="uppercase text-gray-800 text-xs lg:text-sm font-bold focus:bg-pink-300
           hover:bg-pink-300 px-2 h-full py-1 rounded transition-all duration-300"
          >
            Features
          </button>
          <button
            className="uppercase text-gray-800 text-xs lg:text-sm font-bold focus:bg-pink-300
           hover:bg-pink-300 px-2 h-full py-1 rounded transition-all duration-300"
          >
            Blog
          </button>
          <button
            className="uppercase text-gray-800 text-xs lg:text-sm font-bold focus:bg-pink-300
           hover:bg-pink-300 px-2 h-full py-1 rounded transition-all duration-300"
          >
            Contact us
          </button>
          <button
            className="uppercase text-gray-800 text-xs lg:text-sm font-bold focus:bg-pink-300
           hover:bg-pink-300 px-2 h-full py-1 rounded transition-all duration-300"
          >
            About
          </button>
        </div>
        <main className=" w-full h-full relative  ">
          <div className="flex flex-col lg:flex-row lg:pt-16 ">
            <section className="w-full lg:w-[50%] flex flex-col lg:translate-x-10 @md:px-2 lg:px-0 p-5 lg:p-10 lg:p-0">
              <div className="w-full h-auto  lg:pt-7  ">
                <p>Hello Rufaro!</p>
                <h1 className="__classNameName_8c8ae6 text-2xl lg:text-5xl lg:text-6xl text-[#432010] mb-10 font-extrabold uppercase ">
                  Welcome to Skillbase{" "}
                </h1>
                <h1 className="__classNameName_8c8ae6 text-3xl lg:text-5xl lg:text-6xl  font-extrabold  ">
                  {" "}
                </h1>
                <p className="max-w-sm py-5 text-gray-700  lg:text-lg mb-20">
                  Skillbase your knowledge portal to keep you safe and have a
                  healthy workspace
                </p>
                <div className="w-full flex items-center text-white justify-start gap-2">
                  <a href="/courses" className="p-4 px-12 shadow-lg text-center text-3xl bg-[#432010] rounded-full text-white font-bold  shadow-gray-400">
                    Start Training
                  </a>
                </div>
              </div>
            </section>
            <section className="relative w-full lg:w-[50%] flex  items-center  justify-center  ">
              <img
                src="https://utfs.io/f/a9c82c53-ac6e-4db4-a770-24242328e259-k6t0zs.png"
                alt="Hero Image"
                className="h-full w-full object-contain z-10"
              />
            </section>
          </div>
          <div className="lg:w-[80%] w-full  mt-10">
            <h2 className="text-4xl font-bold px-10 py-10 __classNameName_8c8ae6"></h2>
            <div className="w-full grid  lg:grid-cols-3 gap-5 px-5 lg:px-20">
              <div className="w-full h-auto p-3 flex flex-col items-center gap-3  hover:shadow-lg rounded-xl ">
                <div className="h-14 w-14 p-2 rounded-xl bg-pink-800 flex items-center justify-center">
               
                </div>
                <p className="text-slate-800  text-lg font-bold">
                  Safety Courses
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="w-full h-auto p-3 flex flex-col items-center gap-3  hover:shadow-lg rounded-xl ">
                <div className="h-14 w-14 p-2 rounded-xl bg-pink-800 flex items-center justify-center">
                  <img
                    src="/hero-section/image/hero19b.png"
                    alt="UX/UI"
                    className="h-10 w-10 object-cover"
                  />
                </div>
                <p className="text-slate-800 text-lg font-bold">
                  HR Code of Conduct
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="w-full h-auto p-3 flex flex-col items-center gap-3  hover:shadow-lg rounded-xl ">
                <div className="h-14 w-14 p-2 rounded-xl bg-pink-800 flex items-center justify-center">
                  <img
                    src="/hero-section/image/hero19c.png"
                    alt="Product Design"
                    className="h-10 w-10 object-cover"
                  />
                </div>
                <p className="text-slate-800  text-lg font-bold">
                  Certifications
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>
      </div>
    </div>
  );
}

export default DashMainSection;
