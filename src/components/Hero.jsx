import { safetyhelmets, safetyImage } from "../assets";

function Hero() {
  return (
    <div className="bg-gray-50 ">
      <div className="w-full container mx-auto h-auto">
        <section className="w-full h-auto flex flex-col lg:flex-row-reverse  lg:px-16">
          <div className="w-full lg:w-[50%] flex items-center justify-center overflow-hidden">
            <img
              src={safetyhelmets}
              alt="https://www.freepik.com/free-psd/helmet-construction-icon-isolated-3d-render-illustration_32704474.htm#fromView=image_search_similar&page=1&position=28&uuid=5ff89a1f-a423-4b94-916d-60f88b391082&new_detail=true"
              className="h-[]  object-cover"
            />
          </div>
          <div className="w-full h-auto lg:w-[50%] flex flex-col mt-5 md:mt-10 lg:mt-20 ">
            <h1 className="text-3xl md:text-4xl lg:text-7xl [object Object] px-2 lg:px-0 text-center lg:text-left">
              Skillbase: Safety and Compliance Training
            </h1>
            <p className="text-sm lg:text-lg mt-5 mx-2 px-5 lg:px-0 text-center lg:text-left">
              Welcome to Skillbase, the ultimate platform for workplace training
              and development. Designed for both employees and trainers,
              Skillbase provides comprehensive courses in Safety Training and
              Workplace Conduct, equipping teams with the essential skills
              needed for a safer, more compliant, and successful work
              environment.
            </p>
            <a
              href="/login"
              className="h-16 w-60 bg-[#432010] flex items-center justify-start rounded-full mt-5 p-1.5 mx-5 hover:opacity-80 transition "
            >
              <span className="flex flex-1 items-center justify-center text-white text-lg font-bold">
                Begin your training
              </span>
              <div className=" h-9 w-9 bg-[white] rounded-full flex items-center justify-center -rotate-45 ">
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
                <span className="sr-only">Arrow Right Icon</span>
              </div>
            </a>
            <ul className="flex items-center justify-start gap-5 lg:gap-12 h-28 mt-5 z-10">
              <li className="flex flex-col items-center font-bold p-5 shadow-lg rounded-lg ">
                <p className="text-3xl lg:text-5xl">
                  1K<span className="text-yellow-700">+</span>
                </p>
                <p>Safety</p>
              </li>
              <li className="flex flex-col items-center font-bold p-5 shadow-lg rounded-lg">
                <p className="text-3xl lg:text-5xl">
                  10K<span className="text-yellow-700">+</span>
                </p>
                <p>Compliance</p>
              </li>
              <li className="flex flex-col items-center font-bold p-5 shadow-lg rounded-lg">
                <p className="text-3xl lg:text-5xl">
                  3K<span className="text-yellow-700">+</span>
                </p>
                <p>Certifications</p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Hero;
